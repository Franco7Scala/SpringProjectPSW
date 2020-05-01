package it.frankladder.fakestore.services;


import it.frankladder.fakestore.repositories.ProductRepository;
import it.frankladder.fakestore.support.exceptions.BarCodeAlreadyExistException;
import it.frankladder.fakestore.entities.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;


@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;


    @Transactional(readOnly = false)
    public void addProduct(Product product) throws BarCodeAlreadyExistException {
        if ( product.getBarCode() != null && productRepository.existsByBarCode(product.getBarCode()) ) {
            throw new BarCodeAlreadyExistException();
        }
        productRepository.save(product);
    }

    @Transactional(readOnly = true)
    public List<Product> showAllProducts() {
        return productRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Product> showAllProducts(int pageNumber, int pageSize, String sortBy) {
        Pageable paging = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page<Product> pagedResult = productRepository.findAll(paging);
        if ( pagedResult.hasContent() ) {
            return pagedResult.getContent();
        }
        else {
            return new ArrayList<>();
        }
    }

    @Transactional(readOnly = true)
    public List<Product> showProductsByName(String name) {
        return productRepository.findByNameContaining(name);
    }

    @Transactional(readOnly = true)
    public List<Product> showProductsByBarCode(String barCode) {
        return productRepository.findByBarCode(barCode);
    }


}
