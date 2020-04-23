package it.frankladder.orders.repositories;


import it.frankladder.orders.entities.ProductInPurchase;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;


@Repository
public interface ProductInPurchaseRepository extends JpaRepository<ProductInPurchase, Integer> {

}
