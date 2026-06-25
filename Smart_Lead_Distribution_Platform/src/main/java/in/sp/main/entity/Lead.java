package in.sp.main.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="leads")
public class Lead {
	
	
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;
	 
	 
	 private String customerName;
	 private String customerPhone;
	 private String customerAddress;
	 private String problemDescription;
	 private LocalDateTime createdAt;
	 
	 @Enumerated(EnumType.STRING)
	 private ServiceType serviceType;
	 
	 @Enumerated(EnumType.STRING)
	    private LeadStatus status;
	 
	 @ManyToOne
	 @JoinColumn(name = "provider_id")
	 private Provider provider;
	 
	 @PrePersist
	 public void prePersist() {
	     this.createdAt = LocalDateTime.now();

	     if(this.status == null) {
	         this.status = LeadStatus.PENDING;
	     }
	 }
	 

}
