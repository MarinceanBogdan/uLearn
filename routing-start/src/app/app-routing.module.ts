import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/auth-guard.service";
import { HomeComponent } from "src/app/home/home.component";
import { PageNotFoundComponent } from "src/app/page-not-found/page-not-found.component";
import { CanDeactivateGuard } from "src/app/servers/edit-server/can-deactivate-guard.service";
import { EditServerComponent } from "src/app/servers/edit-server/edit-server.component";
import { ServerComponent } from "src/app/servers/server/server.component";
import { ServersComponent } from "src/app/servers/servers.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from "./servers/server/server.resollver.service";

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent}
    ]},
    { path: 'servers', 
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard], 
    component: ServersComponent, children: [
      { path: ':id', component: ServerComponent, resolve: {server: ServerResolver}},
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]}
    ]},
    // {path: 'not-found', component: PageNotFoundComponent},
    {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'}},
    {path: '**', redirectTo: '/not-found'}
];


@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes,  {useHash: true})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}