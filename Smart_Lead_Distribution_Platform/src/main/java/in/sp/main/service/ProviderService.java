package in.sp.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.sp.main.entity.Lead;
import in.sp.main.entity.LeadStatus;
import in.sp.main.entity.Provider;
import in.sp.main.entity.User;
import in.sp.main.repo.LeadRepository;
import in.sp.main.repo.ProviderRepository;
import in.sp.main.repo.UserRepository;

@Service
public class ProviderService {
	
	@Autowired
	private LeadRepository leadRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private ProviderRepository providerRepo;

	@Autowired
	private JwtService jwtService;
	

	public List<Lead> getMyLeads(String token){

	    String email =
	            jwtService.extractEmail(token);

	    User user =
	            userRepo.findByEmail(email)
	            .orElseThrow();

	    Provider provider =
	            providerRepo.findByUser(user)
	            .orElseThrow();

	    return leadRepo.findByProvider(provider);
	}
	
	public String startLead(Long id){

	    Lead lead =
	            leadRepo.findById(id)
	            .orElseThrow();

	    lead.setStatus(
	            LeadStatus.IN_PROGRESS);

	    leadRepo.save(lead);

	    return "Lead Started";
	}
	
	public String completeLead(Long id){

	    Lead lead =
	            leadRepo.findById(id)
	            .orElseThrow();

	    lead.setStatus(
	            LeadStatus.COMPLETED);

	    Provider provider =
	            lead.getProvider();

	    provider.setCurrentActiveLeads(
	            provider.getCurrentActiveLeads() - 1);

	    providerRepo.save(provider);

	    leadRepo.save(lead);

	    return "Lead Completed";
	}
}
