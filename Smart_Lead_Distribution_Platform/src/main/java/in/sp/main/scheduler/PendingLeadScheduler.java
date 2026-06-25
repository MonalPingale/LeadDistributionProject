package in.sp.main.scheduler;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import in.sp.main.entity.Lead;
import in.sp.main.entity.LeadStatus;
import in.sp.main.entity.Provider;
import in.sp.main.repo.LeadRepository;
import in.sp.main.repo.ProviderRepository;
import jakarta.transaction.Transactional;


@Component
@Transactional
public class PendingLeadScheduler {

    @Autowired
    private LeadRepository leadRepo;

    @Autowired
    private ProviderRepository providerRepo;

//    @Scheduled(fixedRate = 900000) // 15 Minutes
    @Scheduled(fixedRate = 120000) // 2 Minutes
    public void assignPendingLeads() {

        System.out.println("Scheduler Started : "
                + LocalDateTime.now());

        List<Lead> pendingLeads =
                leadRepo.findByStatusOrderByCreatedAtAsc(
                        LeadStatus.PENDING);

        for (Lead lead : pendingLeads) {

            List<Provider> providers =
                    providerRepo.findAvailableProviders(
                            lead.getServiceType());

            if (providers.isEmpty()) {
                continue;
            }

            Provider provider = providers.get(0);

            int current =
                    provider.getCurrentActiveLeads() == null
                            ? 0
                            : provider.getCurrentActiveLeads();

            provider.setCurrentActiveLeads(current + 1);
            provider.setLastAssignedAt(LocalDateTime.now());

            providerRepo.save(provider);

            lead.setProvider(provider);
            lead.setStatus(LeadStatus.ASSIGNED);

            leadRepo.save(lead);

            System.out.println(
                    "Pending Lead "
                    + lead.getId()
                    + " Assigned To Provider "
                    + provider.getId());
        }
    }
}