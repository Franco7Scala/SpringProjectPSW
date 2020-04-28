package it.frankladder.orders.services;


import it.frankladder.orders.entities.ProductInPurchase;
import it.frankladder.orders.entities.Purchase;
import it.frankladder.orders.entities.User;
import it.frankladder.orders.repositories.ProductInPurchaseRepository;
import it.frankladder.orders.repositories.PurchaseRepository;
import it.frankladder.orders.repositories.UserRepository;
import it.frankladder.orders.support.exceptions.DateWrongRangeException;
import it.frankladder.orders.support.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.Date;
import java.util.List;


@Service
public class PurchasingService {
    @Autowired
    private PurchaseRepository purchaseRepository;
    @Autowired
    private ProductInPurchaseRepository productInPurchaseRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EntityManager entityManager;


    @Transactional(readOnly = false)
    public Purchase addPurchase(Purchase purchase) {
        Purchase result = purchaseRepository.save(purchase);
        for (ProductInPurchase product : result.getProductsInPurchase() ) {
            product.setPurchase(result);
            productInPurchaseRepository.save(product);
            entityManager.refresh(product);
        }
        entityManager.refresh(result);
        return result;
    }

    @Transactional(readOnly = true)
    public List<Purchase> getPurchasesByUser(User user) throws UserNotFoundException {
        if ( !userRepository.existsById(user.getId()) ) {
            throw new UserNotFoundException();
        }
        return purchaseRepository.findByBuyer(user);
    }

    @Transactional(readOnly = true)
    public List<Purchase> getPurchasesByUserInPeriod(User user, Date startDate, Date endDate) throws UserNotFoundException, DateWrongRangeException {
        if ( !userRepository.existsById(user.getId()) ) {
            throw new UserNotFoundException();
        }
        if ( startDate.compareTo(endDate) >= 0 ) {
            throw new DateWrongRangeException();
        }
        return purchaseRepository.findByBuyerInPeriod(startDate, endDate, user);
    }

    @Transactional(readOnly = true)
    public List<Purchase> getAllPurchases() {
        return purchaseRepository.findAll();
    }


}
