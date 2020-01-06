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
//import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ArchivoComponent } from './leyes-provinciales/archivo/archivo.component';
import { LoginComponent } from './usuarios/login.component';
// import { AuthGuard } from './usuarios/guards/auth.guard';
// import { RoleGuard } from './usuarios/guards/role.guard';
// import { TokenInterceptor } from './usuarios/interceptors/token.interceptor';
// import { AuthInterceptor } from './usuarios/interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PaginatorComponent} from './paginator/paginator.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import {FormComponentUsuario} from './usuarios/formUsuario.component';


import { DecretosComponent } from './decretos/decretos.component';
import { FormDecretoComponent } from './decretos/form-decreto.component';
import { SectionInternoComponent } from './section-interno/section-interno.component';
import { ArchivoDecretoComponent } from './decretos/archivo-decreto/archivo-decreto.component';
import { DecretosLeyComponent } from './decretos-ley/decretos-ley.component';
import { ArchivoDecretoLeyComponent } from './decretos-ley/archivo-decreto-ley/archivo-decreto-ley.component';
import { FormDecretoLeyComponent } from './decretos-ley/form-decreto-ley.component';
import { ResumenNormativoComponent } from './resumen-normativo/resumen-normativo.component';
import { FormResumenNormativoComponent } from './resumen-normativo/form-resumen-normativo.component';
import { ArchivoResumenNormativoComponent } from './resumen-normativo/archivo-resumen-normativo/archivo-resumen-normativo.component';
import { DecretoReglamentarioComponent } from './decreto-reglamentario/decreto-reglamentario.component';
import { FormDecretoReglamentarioComponent } from './decreto-reglamentario/form-decreto-reglamentario.component';
import { ArchivoDecretoReglamentarioComponent } from './decreto-reglamentario/archivo-decreto-reglamentario/archivo-decreto-reglamentario.component';
import { LeyesProvincialesExtComponent } from './leyes-provinciales-ext/leyes-provinciales-ext.component';




const routes: Routes = [
  { path: '', redirectTo: '/sectionInterno', pathMatch: 'full' },
  { path: 'section', component: SectionComponent },
  { path: 'leyesProvinciales', component: LeyesProvincialesComponent },
  { path: 'leyesProvinciales/page/:page', component: LeyesProvincialesComponent },
  { path: 'constitucionProvincial', component: ConstitucionProvincialComponent },
  { path: 'leyesProvinciales/form', component: FormComponent },
  { path: 'leyesProvinciales/form/:id', component: FormComponent},
  //{ path: 'login', component: LoginComponent },
  //{ path: 'crearUsuario', component: CrearUsuarioComponent },
  //{ path: 'usuarios/formUsuario', component: FormComponentUsuario},
 //{ path: 'usuarios/formUsuario/:id', component: FormComponentUsuario},
  {path: 'decretos', component: DecretosComponent},
  {path: 'decretos/formDecreto', component: FormDecretoComponent},
  {path: 'decretos/formDecreto/:id', component: FormDecretoComponent},
  {path: 'sectionInterno', component: SectionInternoComponent },
  {path: 'decretosLey', component: DecretosLeyComponent},
  {path: 'decretosLey/formDecretoLey', component: FormDecretoLeyComponent},
  {path: 'decretosLey/formDecretoLey/:id', component: FormDecretoLeyComponent},
  {path: 'resumenesNormativos', component: ResumenNormativoComponent},
  {path: 'resumenesNormativos/formResumenNormativo', component: FormResumenNormativoComponent},
  {path: 'resumenesNormativos/formResumenNormativo/:id', component: FormResumenNormativoComponent},
  {path: 'decretosReglamentarios', component: DecretoReglamentarioComponent},
  {path: 'decretosReglamentarios/formDecretoReglamentario', component: FormDecretoReglamentarioComponent},
  {path: 'decretosReglamentarios/formDecretoReglamentario/:id', component: FormDecretoReglamentarioComponent},
  {path: 'leyesProvincialesExt', component: LeyesProvincialesExtComponent },

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
    CrearUsuarioComponent,
    FormComponentUsuario,
    DecretosComponent,
    FormDecretoComponent,
    SectionInternoComponent,
    ArchivoDecretoComponent,
    DecretosLeyComponent,
    ArchivoDecretoLeyComponent,
    FormDecretoLeyComponent,
    ResumenNormativoComponent,
    FormResumenNormativoComponent,
    ArchivoResumenNormativoComponent,
    DecretoReglamentarioComponent,
    FormDecretoReglamentarioComponent,
    ArchivoDecretoReglamentarioComponent,
    LeyesProvincialesExtComponent,


  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule, //hacemos la importacion para usar los formularios
    HttpClientModule, BrowserAnimationsModule,
    ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule //busqueda autocomplete

  ],
  providers: [LeyProvincialService],// { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },], //servicios globales
  bootstrap: [AppComponent]
})
export class AppModule { }
