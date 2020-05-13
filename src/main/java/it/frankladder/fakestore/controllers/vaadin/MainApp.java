package it.frankladder.fakestore.controllers.vaadin;


import com.vaadin.flow.component.page.Viewport;
import com.vaadin.flow.component.polymertemplate.Id;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.PWA;
import com.vaadin.flow.templatemodel.TemplateModel;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.polymertemplate.PolymerTemplate;


@Route("mainApp")
@Tag("main-app")
@JsModule("./src/main-app.js")
@Viewport("width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes, viewport-fit=cover")
@PWA(name = "Fake Store", shortName = "Fake Store")
public class MainApp extends PolymerTemplate<MainApp.MainAppModel> {
    @Id("productsSearch")
    private ProductsSearch productsSearch;
    @Id("userRegistration")
    private UserRegistration userRegistration;


    public MainApp() {
    }

    public interface MainAppModel extends TemplateModel {
    }


}
