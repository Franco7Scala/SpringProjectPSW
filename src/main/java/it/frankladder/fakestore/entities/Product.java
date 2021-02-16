package it.frankladder.fakestore.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import javax.persistence.*;
import java.util.List;


@Getter
@Setter
@EqualsAndHashCode
@ToString
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


}
