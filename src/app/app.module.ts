import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SectionComponent } from './section/section.component';
import { LeyesProvincialesComponent } from './leyes-provinciales/leyes-provinciales.component';
import {LeyProvincialService} from './leyes-provinciales/ley-provincial.service';
import { RouterModule, Routes} from '@angular/router'; //importaciones para usar Rutas
import { ConstitucionProvincialComponent } from './constitucion-provincial/constitucion-provincial.component';
import { FormComponent } from './leyes-provinciales/form/form.component';
import { FormsModule } from '@angular/forms'; //para hacer formularios
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path: '', redirectTo: '/section', pathMatch: 'full'},
  {path: 'section', component: SectionComponent},
  {path: 'leyesProvinciales', component: LeyesProvincialesComponent},
  {path: 'constitucionProvincial', component: ConstitucionProvincialComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SectionComponent,
    LeyesProvincialesComponent,
    ConstitucionProvincialComponent,
    FormComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule, //hacemos la importacion para usar los formularios
    HttpClientModule
  ],
  providers: [LeyProvincialService], //servicios globales
  bootstrap: [AppComponent]
})
export class AppModule { }
