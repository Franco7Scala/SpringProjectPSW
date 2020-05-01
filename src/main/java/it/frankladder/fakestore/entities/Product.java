package it.frankladder.fakestore.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.util.List;
import java.util.Objects;


@Entity
@Table(name = "product", schema = "orders")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;
    @Basic
    @Column(name = "name", nullable = true, length = 50)
    private String name;
    @Basic
    @Column(name = "bar_code", nullable = true, length = 70)
    private String barCode;
    @Basic
    @Column(name = "description", nullable = true, length = 500)
    private String description;
    @OneToMany(targetEntity = ProductInPurchase.class, mappedBy = "product", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<ProductInPurchase> productsInPurchase;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBarCode() {
        return barCode;
    }

    public void setBarCode(String barCode) {
        this.barCode = barCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<ProductInPurchase> getProductsInPurchase() {
        return productsInPurchase;
    }

    public void setProductsInPurchase(List<ProductInPurchase> productsInPurchase) {
        this.productsInPurchase = productsInPurchase;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product that = (Product) o;
        return id == that.id &&
                Objects.equals(name, that.name) &&
                Objects.equals(barCode, that.barCode) &&
                Objects.equals(description, that.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, barCode, description);
    }

    @Override
    public String toString() {
        return  "id = " + id +
                ", name = " + name +
                ", barCode = " + barCode +
                ", description = " + description;
    }

}
