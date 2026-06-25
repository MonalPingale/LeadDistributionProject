//package in.sp.main.entity;
//
//
//import java.time.LocalDateTime;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.EnumType;
//import jakarta.persistence.Enumerated;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.OneToOne;
//import jakarta.persistence.Table;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import lombok.ToString;
//
//@ToString
//@Entity
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
//@Table(name="provider")
//public class Provider {
//	
//	 @Id
//	 @GeneratedValue(strategy = GenerationType.IDENTITY)
//	 private Long id;
//	 
//	 @OneToOne
//	 @JoinColumn(name="user_id")
//	 private User user;
//	 
//	 
//	 @Enumerated(EnumType.STRING)
//	 private ServiceType serviceType;
//	 
//	 
//	 private Integer maxActiveLeads;
//	 private Integer currentActiveLeads;
//	 private boolean available;
//	
//	
//	
//
//}

package in.sp.main.entity;


import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="provider")
public class Provider {
	
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;
	 
	 @OneToOne
	 @JoinColumn(name="user_id")
	 private User user;
	 
	 
	 @Enumerated(EnumType.STRING)
	 private ServiceType serviceType;
	 
	 
	 private Integer maxActiveLeads;
	 private Integer currentActiveLeads;
	 private boolean available;
	 private LocalDateTime lastAssignedAt;
	
	
	

}

