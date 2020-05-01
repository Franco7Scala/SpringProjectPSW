package it.frankladder.fakestore.repositories;


import it.frankladder.fakestore.entities.ProductInPurchase;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;


@Repository
public interface ProductInPurchaseRepository extends JpaRepository<ProductInPurchase, Integer> {

}
