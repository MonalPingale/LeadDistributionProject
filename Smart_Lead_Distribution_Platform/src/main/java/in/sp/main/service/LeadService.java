//package in.sp.main.service;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import in.sp.main.dto.CreateLeadRequest;
//import in.sp.main.entity.Lead;
//import in.sp.main.entity.LeadStatus;
//import in.sp.main.entity.Provider;
//import in.sp.main.exception1.OwnException;
//import in.sp.main.repo.LeadRepository;
//import in.sp.main.repo.ProviderRepository;
//import jakarta.transaction.Transactional;
//
//@Service
//@Transactional
//public class LeadService {
//
//    @Autowired
//    private LeadRepository repo;
//
//    @Autowired
//    private ProviderRepository providerepo;
//
//    public synchronized String createLead(CreateLeadRequest request) {
//
//        List<Provider> providers =
//                providerepo.findByServiceType(
//                        request.getServiceType());
//
//        Lead lead = Lead.builder()
//                .customerName(request.getCustomerName())
//                .customerPhone(request.getCustomerPhone())
//                .customerAddress(request.getCustomerAddress())
//                .serviceType(request.getServiceType())
//                .problemDescription(request.getProblemDescription())
//                .build();
//
//        if (providers.isEmpty()) {
//
//            lead.setStatus(LeadStatus.PENDING);
//            lead.setProvider(null);
//
//            repo.save(lead);
//
//            return "No Provider Found. Lead Added To Waiting Queue";
//        }
//
//        Provider assignedProvider = null;
//
//        for (Provider provider : providers) {
//
//            int current =
//                    provider.getCurrentActiveLeads() == null
//                            ? 0
//                            : provider.getCurrentActiveLeads();
//
//            int max =
//                    provider.getMaxActiveLeads() == null
//                            ? 0
//                            : provider.getMaxActiveLeads();
//
//            System.out.println(
//                    "Provider Id : " + provider.getId()
//                    + " Current : " + current
//                    + " Max : " + max);
//
//            if (current < max) {
//                assignedProvider = provider;
//                break;
//            }
//        }
//
//        // ALL PROVIDERS FULL
//        if (assignedProvider == null) {
//
//            lead.setProvider(null);
//            lead.setStatus(LeadStatus.PENDING);
//
//            repo.save(lead);
//
//            return "All Providers Busy. Lead Added To Waiting Queue";
//        }
//
//        int current =
//                assignedProvider.getCurrentActiveLeads() == null
//                        ? 0
//                        : assignedProvider.getCurrentActiveLeads();
//
//        assignedProvider.setCurrentActiveLeads(current + 1);
//
//        providerepo.save(assignedProvider);
//
//        lead.setProvider(assignedProvider);
//        lead.setStatus(LeadStatus.ASSIGNED);
//
//        repo.save(lead);
//
//        return "Lead Assigned To : "
//                + assignedProvider.getUser().getUsername();
//    }
//}

















package in.sp.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.sp.main.dto.CreateLeadRequest;
import in.sp.main.entity.Lead;
import in.sp.main.entity.LeadStatus;
import in.sp.main.entity.Provider;
import in.sp.main.exception1.OwnException;
import in.sp.main.repo.LeadRepository;
import in.sp.main.repo.ProviderRepository;
import jakarta.transaction.Transactional;
@Service
@Transactional
public class LeadService {

    @Autowired
    private LeadRepository repo;
    
    private static int roundRobinIndex = 0;

    @Autowired
    private ProviderRepository providerepo;

    public synchronized String createLead(CreateLeadRequest request) {
    	
    	
    	List<Lead> existingLeads =
    	        repo.findByCustomerPhoneAndServiceType(
    	                request.getCustomerPhone(),
    	                request.getServiceType());

    	System.out.println("=================================");
    	System.out.println("Phone : " + request.getCustomerPhone());
    	System.out.println("Service : " + request.getServiceType());
    	System.out.println("Existing Leads Count : " + existingLeads.size());

    	for (Lead l : existingLeads) {
    	    System.out.println(
    	            "Lead Id = " + l.getId()
    	            + " Status = " + l.getStatus()
    	            + " Phone = " + l.getCustomerPhone());
    	}

    	boolean alreadyExists =
    	        existingLeads.stream()
    	                .anyMatch(lead ->
    	                        lead.getStatus() == LeadStatus.PENDING
    	                        || lead.getStatus() == LeadStatus.ASSIGNED
    	                        || lead.getStatus() == LeadStatus.IN_PROGRESS);

    	System.out.println("Already Exists = " + alreadyExists);
    	System.out.println("=================================");

    	if (alreadyExists) {

    	    throw new OwnException(
    	            "You already have an active "
    	            + request.getServiceType().name().toLowerCase()
    	            + " service request. Please wait until your current request is completed.");
    	}
        List<Provider> providers =
                providerepo.findAvailableProviders(
                        request.getServiceType());

        Lead lead = Lead.builder()
                .customerName(request.getCustomerName())
                .customerPhone(request.getCustomerPhone())
                .customerAddress(request.getCustomerAddress())
                .serviceType(request.getServiceType())
                .problemDescription(request.getProblemDescription())
                .build();

        if (providers.isEmpty()) {

            lead.setStatus(LeadStatus.PENDING);
            lead.setProvider(null);

            repo.save(lead);

            System.out.println(
                    "PENDING => No Provider Available");

            return "All Providers Busy. Lead Added To Waiting Queue";
        }

        Provider assignedProvider = providers.get(0);

        System.out.println(
                "SELECTED => Provider "
                + assignedProvider.getId()
                + " Current="
                + assignedProvider.getCurrentActiveLeads()
                + " Max="
                + assignedProvider.getMaxActiveLeads());

        int current =
                assignedProvider.getCurrentActiveLeads() == null
                        ? 0
                        : assignedProvider.getCurrentActiveLeads();

        assignedProvider.setCurrentActiveLeads(current + 1);

        assignedProvider.setLastAssignedAt(
                java.time.LocalDateTime.now());

        providerepo.save(assignedProvider);

        System.out.println(
                "UPDATED => Provider "
                + assignedProvider.getId()
                + " New Current="
                + assignedProvider.getCurrentActiveLeads());

        lead.setProvider(assignedProvider);
        lead.setStatus(LeadStatus.ASSIGNED);

        repo.save(lead);

        return "Lead Assigned To : "
                + assignedProvider.getUser().getUsername();
    }
}