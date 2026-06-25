package in.sp.main.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import in.sp.main.entity.Lead;
import in.sp.main.entity.LeadStatus;
import in.sp.main.entity.Provider;
import in.sp.main.entity.ServiceType;


@Repository
public interface LeadRepository
extends JpaRepository<Lead, Long> {
	
	List<Lead> findByStatusOrderByCreatedAtAsc(
	        LeadStatus status);

	List<Lead> findByStatus(LeadStatus status);

	List<Lead> findByProvider(Provider provider);
	
	  List<Lead> findByCustomerPhoneAndServiceType(
	            String customerPhone,
	            ServiceType serviceType);
	  
	  long countByStatus(LeadStatus status);

	  long countByServiceType(ServiceType serviceType);

	  long countByServiceTypeAndStatus(
	          ServiceType serviceType,
	          LeadStatus status);

	  long countByProviderAndStatus(
	          Provider provider,
	          LeadStatus status);

	  List<Lead> findByCustomerPhone(
	          String phone);

	  @Query("""
	  SELECT DISTINCT l.customerPhone
	  FROM Lead l
	  """)
	  List<String> findDistinctPhones();
}
