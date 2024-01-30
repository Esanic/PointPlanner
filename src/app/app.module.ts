import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { TableComponent } from './components/table/table.component';
import { SelectRaceComponent } from './components/select-race/select-race.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { SelectWeaponSkillComponent } from './components/select-weapon-skill/select-weapon-skill.component';
import { SettingsComponent } from './components/settings/settings.component';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SelectRaceComponent,
    OnlyNumberDirective,
    SelectWeaponSkillComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
