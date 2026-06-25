//package in.sp.main.repo;
//
//import java.util.List;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Lock;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.stereotype.Repository;
//
//import in.sp.main.entity.Provider;
//import in.sp.main.entity.ServiceType;
//import jakarta.persistence.LockModeType;
//
//@Repository
//public interface ProviderRepository extends JpaRepository<Provider, Long> {
//	 @Lock(LockModeType.PESSIMISTIC_WRITE)
//	    @Query("""
//	           select p
//	           from Provider p
//	           where p.serviceType = :serviceType
//	           """)
//	    List<Provider> findByServiceType(
//	            ServiceType serviceType);
//}


package in.sp.main.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import in.sp.main.entity.Provider;
import in.sp.main.entity.ServiceType;
import in.sp.main.entity.User;
import jakarta.persistence.LockModeType;

@Repository
public interface ProviderRepository extends JpaRepository<Provider, Long> {
//	 @Lock(LockModeType.PESSIMISTIC_WRITE)
//	    @Query("""
//	           select p
//	           from Provider p
//	           where p.serviceType = :serviceType
//	           """)
	    List<Provider> findByServiceType(
	            ServiceType serviceType);
	 
	 
	    @Lock(LockModeType.PESSIMISTIC_WRITE)
	    @Query("""
	    select p
	    from Provider p
	    where p.serviceType = :serviceType
	    order by p.lastAssignedAt asc
	    """)
	    List<Provider> findProvidersForRoundRobin(
	            ServiceType serviceType);
	    
	    @Lock(LockModeType.PESSIMISTIC_WRITE)
	    @Query("""
	           select p
	           from Provider p
	           where p.serviceType = :serviceType
	           and p.currentActiveLeads < p.maxActiveLeads
	           order by p.lastAssignedAt asc nulls first
	           """)
	    List<Provider> findAvailableProviders(
	            ServiceType serviceType);

	    Optional<Provider> findByUser(User user);
}
	 
