package it.frankladder.fakestore.controllers.vaadin;


import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.polymertemplate.Id;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.templatemodel.TemplateModel;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.polymertemplate.PolymerTemplate;
import it.frankladder.fakestore.entities.Product;
import it.frankladder.fakestore.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;


@Tag("products-search")
@JsModule("./src/products-search.js")
public class ProductsSearch extends PolymerTemplate<ProductsSearch.ProductsSearchModel> {
    @Autowired
    private ProductService productService;

    @Id("searchButton")
    private Button searchButton;
    @Id("productNameTextField")
    private TextField productNameTextField;
    @Id("searchResults")
    private Grid<Product> searchResults;


    public ProductsSearch() {
        // building search bar
        searchResults.addColumn(Product::getName).setHeader("Name");
        searchResults.addColumn(Product::getBarCode).setHeader("Barcode");
        searchButton.addClickListener(buttonClickEvent -> {
            String searchText = productNameTextField.getValue();
            List<Product> products = productService.showProductsByName(searchText);
            searchResults.setItems(products);
        });
        // building result table
        searchResults.setSelectionMode(Grid.SelectionMode.SINGLE);
        searchResults.addItemClickListener(event -> {
            Dialog dialog = new Dialog();
            dialog.add(new H3("You have selected this product:"));
            dialog.add(new Label(searchResults.getSelectedItems().toArray()[0].toString()));
            dialog.setWidth("400px");
            dialog.setHeight("150px");
            dialog.open();
        });
    }

    public interface ProductsSearchModel extends TemplateModel {
    }


}
