import {render} from './node_modules/lit-html/lit-html.js';
import page from './node_modules/page/page.mjs';

import { createPage } from './src/views/create.js';
import { loginPage } from './src/views/login.js';
import { navPage } from './src/views/navigationView.js';
import { registerPage } from './src/views/register.js';
import { homePage } from './src/views/home.js'
import { detailsPage } from './src/views/details.js';
import { editPage } from './src/views/edit.js';
import { myBooksPage } from './src/views/myBooks.js';

const main = document.querySelector('#site-content');

page(navPage);

page('/', middleware, homePage);
page('/login', middleware, loginPage);
page('/register', middleware, registerPage);
page('/create', middleware, createPage);
page('/details/:id', middleware, detailsPage);
page('/edit/:id', middleware, editPage);
page('/my-books', middleware, myBooksPage)

page.start();

function middleware(ctx, next) {
    ctx.render = (content) => render(content, main);
    next();
}