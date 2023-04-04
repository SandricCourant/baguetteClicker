import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrameComponent } from './frame/frame.component';
import { MainCategoryComponent } from './main-category/main-category.component';
import { PluralizePipe } from './pluralize.pipe';
import { ColorizeDirective } from './colorize.directive';

@NgModule({
  declarations: [AppComponent, FrameComponent, MainCategoryComponent, PluralizePipe, ColorizeDirective],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
