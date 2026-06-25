package in.sp.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.sp.main.service.ProviderService;

@RestController
@RequestMapping("/provider")
public class ProviderController {
	
	
	  @Autowired
	    private ProviderService service;

	    @GetMapping("/leads")
	    public ResponseEntity<?> getMyLeads(
	            @RequestHeader("Authorization")
	            String authHeader){

	        String token = authHeader.substring(7);

	        return ResponseEntity.ok(
	                service.getMyLeads(token));
	    }

	    @PutMapping("/lead/{id}/start")
	    public ResponseEntity<?> startLead(
	            @PathVariable Long id){

	        return ResponseEntity.ok(
	                service.startLead(id));
	    }

	    @PutMapping("/lead/{id}/complete")
	    public ResponseEntity<?> completeLead(
	            @PathVariable Long id){

	        return ResponseEntity.ok(
	                service.completeLead(id));
	    }

}
