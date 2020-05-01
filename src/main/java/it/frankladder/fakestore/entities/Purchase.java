package it.frankladder.fakestore.entities;


import org.hibernate.annotations.CreationTimestamp;
import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Objects;


@Entity
@Table(name = "purchase", schema = "orders")
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;
    @Basic
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "purchase_time")
    private Date purchaseTime;
    @ManyToOne
    @JoinColumn(name = "buyer")
    private User buyer;
    @OneToMany(mappedBy = "purchase", cascade = CascadeType.MERGE)
    private List<ProductInPurchase> productsInPurchase;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getPurchaseTime() {
        return purchaseTime;
    }

    public void setPurchaseTime(Date purchaseTime) {
        this.purchaseTime = purchaseTime;
    }

    public User getBuyer() {
        return buyer;
    }

    public void setBuyer(User buyer) {
        this.buyer = buyer;
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
        Purchase that = (Purchase) o;
        return id == that.id &&
                Objects.equals(purchaseTime, that.purchaseTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, purchaseTime);
    }


}
