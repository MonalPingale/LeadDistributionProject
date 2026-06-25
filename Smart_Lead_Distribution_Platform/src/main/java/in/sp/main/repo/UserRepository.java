package in.sp.main.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.sp.main.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	
	Optional<User> findByEmail(String email);
}
