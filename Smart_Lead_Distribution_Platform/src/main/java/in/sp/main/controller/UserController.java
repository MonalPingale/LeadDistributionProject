package in.sp.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.sp.main.dto.LoginRequest;
import in.sp.main.dto.RegisterRequest;
import in.sp.main.service.UserService;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping("/SmartLead")
public class UserController {
	
	
	@Autowired
	private UserService service;
	
	
	@PostMapping("/admin/register")
	public ResponseEntity<?> registerme(@RequestBody RegisterRequest request){
		return ResponseEntity.ok(service.register(request));
		
	}
	 @PostMapping("/login")
	    public ResponseEntity<?> login(
	            @RequestBody LoginRequest request,
	            HttpServletResponse response) {

	        return ResponseEntity.ok(
	                service.login(
	                        request,
	                        response));
	  }
	 
	 
	 @GetMapping("/admin/profile")
	 public ResponseEntity<?> profile(
	         @RequestHeader("Authorization")
	         String authHeader){

	     String token =
	             authHeader.substring(7);

	     return ResponseEntity.ok(
	             service.getProfile(token));
	 }
	 
	 
	 
	 @GetMapping("/admin/leads")
	    public ResponseEntity<?> getAllLeads() {

	        return ResponseEntity.ok(
	                service.getAllLeads());
	    }

	    @GetMapping("/admin/providers")
	    public ResponseEntity<?> getAllProviders() {

	        return ResponseEntity.ok(
	                service.getAllProviders());
	    }

	    @GetMapping("/admin/leads/pending")
	    public ResponseEntity<?> getPendingLeads() {

	        return ResponseEntity.ok(
	                service.getPendingLeads());
	    }
	    
	    @GetMapping("/admin/analytics")
	    public ResponseEntity<?> analytics() {

	        return ResponseEntity.ok(
	                service.getAdminAnalytics());
	    }

}
