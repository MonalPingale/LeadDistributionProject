package in.sp.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.sp.main.dto.CreateLeadRequest;
import in.sp.main.service.LeadService;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/dashboard")
public class LeadController {
	
	@Autowired
	private LeadService service;
	
	
	
	@PostMapping("/createLead")
	public ResponseEntity<?> createLead(@RequestBody CreateLeadRequest request){
		
		return ResponseEntity.ok(service.createLead(request));
	}

}
