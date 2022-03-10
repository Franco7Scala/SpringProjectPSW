package it.frankladder.fakestore.repositories;


import it.frankladder.fakestore.entities.User;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;
import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    List<User> findByFirstName(String firstName);
    List<User> findByLastName(String lastName);
    List<User> findByFirstNameAndLastName(String firstName, String lastName);
    List<User> findByEmail(String email);
    List<User> findByCode(String code);
    boolean existsByEmail(String email);

}
