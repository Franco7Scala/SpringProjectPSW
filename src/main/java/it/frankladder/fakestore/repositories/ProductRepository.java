package it.frankladder.fakestore.repositories;


import it.frankladder.fakestore.entities.Product;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;
import java.util.List;


@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findByNameContaining(String name);
    List<Product> findByBarCode(String name);
    boolean existsByBarCode(String barCode);

}
