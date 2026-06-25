package in.sp.main.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import in.sp.main.dto.LoginRequest;
import in.sp.main.dto.LoginResponse;
import in.sp.main.dto.RegisterRequest;
import in.sp.main.dto.RegisterResponse;
import in.sp.main.entity.Lead;
import in.sp.main.entity.LeadStatus;
import in.sp.main.entity.Provider;
import in.sp.main.entity.Role;
import in.sp.main.entity.ServiceType;
import in.sp.main.entity.User;
import in.sp.main.exception1.OwnException;
import in.sp.main.repo.LeadRepository;
import in.sp.main.repo.ProviderRepository;
import in.sp.main.repo.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userrepo;
	
	@Autowired
	private ProviderRepository providerrepo;
	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
    private LeadRepository leadRepo;	

	@Autowired
	private JwtService jwtService;

	public Object register(RegisterRequest request) {
		if(userrepo.findByEmail(request.getEmail()).isPresent()) {
			throw new OwnException("User already existed with this same email ");
		}
		
		 User user = User.builder()
			        .username(request.getUsername())
			        .email(request.getEmail())
			        .password(request.getPassword())
			        .role(request.getRole())
			        .build();

			user = userrepo.save(user); // IMPORTANT

			if(request.getRole() == Role.PROVIDER) {

			    Provider provider = Provider.builder()
			            .user(user)
			            .serviceType(request.getServiceType())
			            .maxActiveLeads(5)
			            .currentActiveLeads(0)
			            .build();

			    providerrepo.save(provider);
			}
		return new RegisterResponse("User register succfully");
	}

	

	public LoginResponse login(
	        LoginRequest request,
	        HttpServletResponse response) {

	    User user = userrepo.findByEmail(
	            request.getEmail())
	            .orElseThrow(() ->
	                    new OwnException(
	                            "Invalid Email"));

	    if(!request.getPassword().equals(user.getPassword())) {
	        throw new OwnException("Invalid Password");
	    }

	    String token =
	            jwtService.generateToken(
	                    user.getEmail(),
	                    user.getRole().name());

	    Cookie cookie =
	            new Cookie(
	                    "JWT_TOKEN",
	                    token);

	    cookie.setHttpOnly(true);
	    cookie.setPath("/");
	    cookie.setMaxAge(24 * 60 * 60);

	    response.addCookie(cookie);

	    return LoginResponse.builder().message(token).role(user.getRole().toString()).build();
	}



	public User getProfile(String token){

	    String email =
	            jwtService.extractEmail(token);

	    return userrepo.findByEmail(email)
	            .orElseThrow(() ->
	                    new OwnException(
	                            "User Not Found"));
	}
	
	
	 public List<Lead> getAllLeads() {

	        return leadRepo.findAll();
	    }

	    public List<Provider> getAllProviders() {

	        return providerrepo.findAll();
	    }

	    public List<Lead> getPendingLeads() {

	        return leadRepo.findByStatus(
	                LeadStatus.PENDING);
	    }



	    public Map<String,Object> getAdminAnalytics() {

	        Map<String,Object> response = new HashMap<>();

	        // Total Counts
	        response.put("totalLeads", leadRepo.count());

	        response.put("pendingLeads",
	                leadRepo.countByStatus(LeadStatus.PENDING));

	        response.put("assignedLeads",
	                leadRepo.countByStatus(LeadStatus.ASSIGNED));

	        response.put("completedLeads",
	                leadRepo.countByStatus(LeadStatus.COMPLETED));

	        response.put("totalProviders",
	                providerrepo.count());

	        response.put(
	                "serviceAnalytics",
	                getServiceAnalytics());

	        response.put(
	                "providerAnalytics",
	                getProviderAnalytics());

	        response.put(
	                "customerAnalytics",
	                getCustomerAnalytics());

	        return response;
	    }
	    
	    private List<Map<String,Object>> getServiceAnalytics(){

	        List<Map<String,Object>> list = new ArrayList<>();

	        for(ServiceType service : ServiceType.values()){

	            Map<String,Object> map = new HashMap<>();

	            map.put("service",service);

	            map.put("totalRequests",
	                    leadRepo.countByServiceType(service));

	            map.put("completed",
	                    leadRepo.countByServiceTypeAndStatus(
	                            service,
	                            LeadStatus.COMPLETED));

	            map.put("pending",
	                    leadRepo.countByServiceTypeAndStatus(
	                            service,
	                            LeadStatus.PENDING));

	            map.put("assigned",
	                    leadRepo.countByServiceTypeAndStatus(
	                            service,
	                            LeadStatus.ASSIGNED));

	            list.add(map);
	        }

	        return list;
	    }
	    
	    private List<Map<String,Object>> getProviderAnalytics(){

	        List<Map<String,Object>> list=new ArrayList<>();

	        List<Provider> providers=
	                providerrepo.findAll();

	        for(Provider provider:providers){

	            Map<String,Object> map=new HashMap<>();

	            map.put("provider",
	                    provider.getUser().getUsername());

	            map.put("service",
	                    provider.getServiceType());

	            long completed=
	                    leadRepo.countByProviderAndStatus(
	                            provider,
	                            LeadStatus.COMPLETED);

	            long assigned=
	                    leadRepo.countByProviderAndStatus(
	                            provider,
	                            LeadStatus.ASSIGNED);

	            map.put("completed",completed);

	            map.put("assigned",assigned);

	            map.put("totalHandled",
	                    completed+assigned);

	            list.add(map);
	        }

	        return list;
	    }
	    
	    private List<Map<String,Object>> getCustomerAnalytics(){

	        List<Map<String,Object>> list=
	                new ArrayList<>();

	        List<String> phones=
	                leadRepo.findDistinctPhones();

	        for(String phone:phones){

	            List<Lead> leads=
	                    leadRepo.findByCustomerPhone(phone);

	            Map<String,Object> map=
	                    new HashMap<>();

	            map.put("phone",phone);

	            map.put("customerName",
	                    leads.get(0).getCustomerName());

	            map.put("requests",
	                    leads.size());

	            long completed=
	                    leads.stream()
	                    .filter(l->l.getStatus()==LeadStatus.COMPLETED)
	                    .count();

	            long pending=
	                    leads.stream()
	                    .filter(l->
	                            l.getStatus()==LeadStatus.PENDING
	                            ||
	                            l.getStatus()==LeadStatus.ASSIGNED
	                            ||
	                            l.getStatus()==LeadStatus.IN_PROGRESS)
	                    .count();

	            map.put("completed",completed);

	            map.put("pending",pending);

	            list.add(map);
	        }

	        return list;
	    }
    
}
