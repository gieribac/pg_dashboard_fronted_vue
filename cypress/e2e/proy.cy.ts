describe("Test E2E para Proyecto Vue 3", () => {
    let admin1, admin2, admin3;
    let newPassword = "NuevoPass123";
  
    before(() => {
      // Datos aleatorios de prueba
      admin1 = {
        name: "Admin Principal",
        no_doc: "123456",
        email: "admin1@example.com",
        username: "adminUser1",
        password: "Pass123456"
      };
  
      admin2 = {
        name: "Admin Secundario",
        no_doc: "654321",
        email: "admin2@example.com",
        username: "adminUser2",
        password: "Pass654321"
      };
  
      admin3 = {
        name: "Admin Normal",
        no_doc: "789123",
        email: "admin3@example.com",
        username: "adminUser3",
        password: "Pass789123"
      };
    });

    
    it("Debe navegar a la página principal", () => {  
        // 1. Navegar al dominio      
        cy.visit("http://localhost:5173/MainV");

        // 2. Registrar admin1
        cy.get("#menu").click();
        cy.get("#register").click();
        cy.get("#reg_name").type(admin1.name);
        cy.get("#reg_doc").type(admin1.no_doc);
        cy.get("#reg_email").type(admin1.email);
        cy.get("#reg_user").type(admin1.username);
        cy.get("#reg_pass").type(admin1.password);
        cy.get("#reg_submit").click();

        // 3. Iniciar sesión como admin1        
        cy.get("#menu").click();
        cy.get("#entry").click();
        cy.get("#lg_user").type(admin1.username);
        cy.get("#lg_pass").type(admin1.password);
        cy.get("#lg_submit").click();

        // 4. Cambiar contraseña
        cy.visit("http://localhost:5173/AdminV");
        cy.get("#menu").click();
        cy.get("#changepass").click();
        cy.get("#pass1").type(admin1.password);
        cy.get("#pass2").type(newPassword);
        cy.get("#pass22").type(newPassword);
        cy.get("#cp_submit").click();
        admin1.password = newPassword; // Actualizar contraseña en variable

     // 5. Crear autorización de admin principal
        cy.get("#menu").click();
        cy.get("#authorizations").click();
        cy.get("#ma_doc").type(admin2.no_doc);
        cy.get("#ma_email").type(admin2.email);
        cy.get("#ma_check").click();
        cy.get("#ma_submit").click();
        cy.get("#ma_cancel").click();

    //  6. Crear autorización de admin no principal
        cy.get("#menu").click();
        cy.get("#authorizations").click();
        cy.get("#ma_doc").type(admin3.no_doc);
        cy.get("#ma_email").type(admin3.email);
        cy.get("#ma_submit").click();
        cy.get("#ma_cancel").click();

     // 7. Cerrar sesión     
        cy.get("#menu").click();
        cy.get("#logout").click();

    // 8. Registrar otros dos admins
        cy.visit("http://localhost:5173/MainV");
        cy.get("#menu").click();
        cy.get("#ingreso").click();
        cy.get("#reg_name").type(admin2.name);
        cy.get("#reg_doc").type(admin2.no_doc);
        cy.get("#reg_email").type(admin2.email);
        cy.get("#reg_user").type(admin2.username);
        cy.get("#reg_pass").type(admin2.password);
        cy.get("#reg_submit").click();

        cy.get("#menu").click();
        cy.get("#ingreso").click();
        cy.get("#reg_name").type(admin3.name);
        cy.get("#reg_doc").type(admin3.no_doc);
        cy.get("#reg_email").type(admin3.email);
        cy.get("#reg_user").type(admin3.username);
        cy.get("#reg_pass").type(admin3.password);
        cy.get("#reg_submit").click();

    // 10. Iniciar sesión con admin principal    
        cy.get("#menu").click();
        cy.get("#entry").click();
        cy.get("#lg_user").type(admin2.username);
        cy.get("#lg_pass").type(admin2.password);
        cy.get("#lg_submit").click();

        cy.visit("http://localhost:5173/AdminV");
        cy.get("#menu").click();
        cy.get("#authorizations").should("exist");
    
    // 11. Cerrar sesión        
        cy.get("#menu").click();
        cy.get("#logout").click();

    // 12. Iniciar sesión con admin no principal y comprobar privilegios
        cy.visit("http://localhost:5173/MainV");
        cy.get("#menu").click();
        cy.get("#entry").click();
        cy.get("#lg_user").type(admin3.username);
        cy.get("#lg_pass").type(admin3.password);
        cy.get("#lg_submit").click();

        cy.visit("http://localhost:5173/AdminV");
        cy.get("#menu").click();
        cy.get("#authorizations").should("not.exist");

    // 13. Actualizar sus datos de admin
        cy.get("#menu").click();
        cy.get("#updateadmin").click();
        cy.get("#up_name").clear().type("Nuevo Nombre");
        cy.get("#up_doc").clear().type("111111");
        cy.get("#up_email").clear().type("nuevoemail@example.com");
        cy.get("#up_user").clear().type("nuevoUser");
        cy.get("#up_submit").click();

    // 14. Crear 3 dashboards y autorizar uno
        for (let i = 0; i < 3; i++) {
            cy.get(".form_ ").eq(0).click();
            cy.get(".formd_title").eq(0).type(`Dashboard ${i + 1}`);
            cy.get(".formd_descripcion").eq(0).type("Descripción del dashboard");
            cy.get(".formd_lugar").eq(0).type("Ubicación X");
            cy.get(".formd_url").eq(0).type(`dash${i + 1}`);
            if (i === 0) cy.get(".form_checkbox").eq(0).click();
            cy.get(".formd_submit").eq(0).click();
        }
    
    // 15. Actualizar y eliminar dashboard
        cy.get(".form_").eq(1).click();
        cy.get(".formd_title").eq(1).clear().type("Dashboard Modificado");
        cy.get(".formd_url").eq(1).clear().type("https://app.powerbi.com/view?r=eyJrIjoiMDA3YjZlZmYtMmZhNC00Y2NmLTg1ZjktMjAwM2Y4MjNlYzZjIiwidCI6ImZjMDA1NDdhLTI0YmItNGU0Zi05ZDYxLTczZmNhNWViOWRmMyIsImMiOjR9");
        cy.get(".formd_submit").eq(1).click();
        cy.get(".form_delete").eq(1).click();
        
    });

    // 2. Registrar admin1
    // it("Registrar admin1", () => {
    //     cy.get("#menu").click();
    //     cy.get("#register").click();
    //     cy.get("#reg_name").type(admin1.name);
    //     cy.get("#reg_doc").type(admin1.no_doc);
    //     cy.get("#reg_email").type(admin1.email);
    //     cy.get("#reg_user").type(admin1.username);
    //     cy.get("#reg_pass").type(admin1.password);
    //     cy.get("#reg_submit").click();
    // });

    // 3. Iniciar sesión como admin1
    // it("Iniciar sesión como admin1", () => {
    //     cy.get("#menu").click();
    //     cy.get("#entry").click();
    //     cy.get("#lg_user").type(admin1.username);
    //     cy.get("#lg_pass").type(admin1.password);
    //     cy.get("#lg_submit").click();
    // });

    // 4. Cambiar contraseña
    // it("Cambiar contraseña de admin1", () => {
    //     cy.get("#menu").click();
    //     cy.get("#changepass").click();
    //     cy.get("#pass1").type(admin1.password);
    //     cy.get("#pass2").type(newPassword);
    //     cy.get("#pass22").type(newPassword);
    //     cy.get("#cp_submit").click();
    //     admin1.password = newPassword; // Actualizar contraseña en variable
    // });

    // // 5. Crear autorización de admin principal
    // it("Crear autorización de admin principal", () => {
    //     cy.get("#menu").click();
    //     cy.get("#authorizations").click();
    //     cy.get("#ma_doc").type(admin2.no_doc);
    //     cy.get("#ma_email").type(admin2.email);
    //     cy.get("#ma_check").click();
    //     cy.get("#ma_submit").click();
    //     cy.get("#ma_cancel").click();
    // });

    // // 6. Crear autorización de admin no principal
    // it("Crear autorización de admin no principal", () => {
    //     cy.get("#menu").click();
    //     cy.get("#authorizations").click();
    //     cy.get("#ma_doc").type(admin3.no_doc);
    //     cy.get("#ma_email").type(admin3.email);
    //     cy.get("#ma_submit").click();
    //     cy.get("#ma_cancel").click();
    // });

    // // 7. Cerrar sesión
    // it("Cerrar sesión", () => {
    //     cy.get("#menu").click();
    //     cy.get("#logout").click();
    // });

    // // 8. Registrar otros dos admins
    // it("Registrar admin2 (autorizado como principal)", () => {
    //     cy.get("#menu").click();
    //     cy.get("#ingreso").click();
    //     cy.get("#reg_name").type(admin2.name);
    //     cy.get("#reg_doc").type(admin2.no_doc);
    //     cy.get("#reg_email").type(admin2.email);
    //     cy.get("#reg_user").type(admin2.username);
    //     cy.get("#reg_pass").type(admin2.password);
    //     cy.get("#reg_submit").click();
    // });

    // it("Registrar admin3 (autorizado como no principal)", () => {
    //     cy.get("#menu").click();
    //     cy.get("#ingreso").click();
    //     cy.get("#reg_name").type(admin3.name);
    //     cy.get("#reg_doc").type(admin3.no_doc);
    //     cy.get("#reg_email").type(admin3.email);
    //     cy.get("#reg_user").type(admin3.username);
    //     cy.get("#reg_pass").type(admin3.password);
    //     cy.get("#reg_submit").click();
    // });

    // // 9. Cerrar sesión
    // it("Cerrar sesión nuevamente", () => {
    //     cy.get("#menu").click();
    //     cy.get("#logout").click();
    // });

    // // 10. Iniciar sesión con admin principal
    // it("Iniciar sesión con admin principal", () => {
    //     cy.get("#menu").click();
    //     cy.get("#entry").click();
    //     cy.get("#lg_user").type(admin2.username);
    //     cy.get("#lg_pass").type(admin2.password);
    //     cy.get("#lg_submit").click();
    //     cy.get("#menu").click();
    //     cy.get("#authorizations").should("exist");
    // });

    // // 11. Cerrar sesión
    // it("Cerrar sesión de admin principal", () => {
    //     cy.get("#menu").click();
    //     cy.get("#logout").click();
    // });

    // // 12. Iniciar sesión con admin no principal y comprobar privilegios
    // it("Iniciar sesión con admin no principal y verificar restricciones", () => {
    //     cy.get("#menu").click();
    //     cy.get("#entry").click();
    //     cy.get("#lg_user").type(admin3.username);
    //     cy.get("#lg_pass").type(admin3.password);
    //     cy.get("#lg_submit").click();
    //     cy.get("#menu").click();
    //     cy.get("#authorizations").should("not.exist");
    // });

    // // 13. Actualizar sus datos de admin
    // it("Actualizar datos de admin", () => {
    //     cy.get("#menu").click();
    //     cy.get("#updateadmin").click();
    //     cy.get("#up_name").clear().type("Nuevo Nombre");
    //     cy.get("#up_doc").clear().type("111111");
    //     cy.get("#up_email").clear().type("nuevoemail@example.com");
    //     cy.get("#up_user").clear().type("nuevoUser");
    //     cy.get("#up_submit").click();
    // });

    // // 14. Crear 3 dashboards y autorizar uno
    // it("Crear 3 dashboards", () => {
    //     for (let i = 0; i < 3; i++) {
    //         cy.get(".form_ ").eq(0).click();
    //         cy.get(".formd_title").eq(0).type(`Dashboard ${i + 1}`);
    //         cy.get(".formd_descripcion").eq(0).type("Descripción del dashboard");
    //         cy.get(".formd_lugar").eq(0).type("Ubicación X");
    //         cy.get(".formd_url").eq(0).type("http://dashboard-url.com");
    //         if (i === 0) cy.get(".form_checkbox").eq(0).click();
    //         cy.get(".formd_submit").eq(0).click();
    //     }
    // });

    // // 15. Actualizar y eliminar dashboard
    // it("Actualizar y eliminar dashboard", () => {
    //     cy.get(".form_").eq(1).click();
    //     cy.get(".formd_title").eq(1).clear().type("Dashboard Modificado");
    //     cy.get(".formd_submit").eq(1).click();
    //     cy.get(".form_delete").eq(1).click();
    // });
});
