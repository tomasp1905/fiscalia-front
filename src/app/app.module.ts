import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SectionComponent } from './section/section.component';
import { LeyesProvincialesComponent } from './leyes-provinciales/leyes-provinciales.component';
import { LeyProvincialService } from './leyes-provinciales/ley-provincial.service';
import { RouterModule, Routes } from '@angular/router'; //importaciones para usar Rutas
import { ConstitucionProvincialComponent } from './constitucion-provincial/constitucion-provincial.component';
import { FormComponent } from './leyes-provinciales/form.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ArchivoComponent } from './leyes-provinciales/archivo/archivo.component';
import { LoginComponent } from './usuarios/login.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { RoleGuard } from './usuarios/guards/role.guard';
import { TokenInterceptor } from './usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from './usuarios/interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PaginatorComponent} from './paginator/paginator.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';




const routes: Routes = [
  { path: '', redirectTo: '/section', pathMatch: 'full' },
  { path: 'section', component: SectionComponent },
  { path: 'leyesProvinciales', component: LeyesProvincialesComponent },
  { path: 'leyesProvinciales/page/:page', component: LeyesProvincialesComponent },
  { path: 'constitucionProvincial', component: ConstitucionProvincialComponent },
  { path: 'leyesProvinciales/form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'leyesProvinciales/form/:id', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'login', component: LoginComponent },
  { path: 'crearUsuario', component: CrearUsuarioComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SectionComponent,
    LeyesProvincialesComponent,
    ConstitucionProvincialComponent,
    FormComponent,
    ArchivoComponent,
    LoginComponent,
    PaginatorComponent,
    CrearUsuarioComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule, //hacemos la importacion para usar los formularios
    HttpClientModule, BrowserAnimationsModule,
    ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule //busqueda autocomplete

  ],
  providers: [LeyProvincialService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },], //servicios globales
  bootstrap: [AppComponent]
})
export class AppModule { }
