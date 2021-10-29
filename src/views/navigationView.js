import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { logout } from '../services/data.js';

const nav = document.querySelector('.navbar');

const guestTemplate = () =>html`
            <div id="guest">
                <a class="button" href="/login">Login</a>
                <a class="button" href="/register">Register</a>
            </div>
`;

const userTemplate = (email, onLogout) =>html`
            <div id="user">
                <span>Welcome, ${email}</span>
                <a class="button" href="/my-books">My Books</a>
                <a class="button" href="/create">Add Book</a>
                <a @click=${onLogout} class="button" href="javascript:void(0)">Logout</a>
            </div>
`;

const navTemplate = (isAuthenticated, email, onLogout) =>html`
        <section class="navbar-dashboard">
            <a href="/">Dashboard</a>
           
            ${!isAuthenticated ? guestTemplate()
            : userTemplate(email, onLogout)}
        </section>
`;

export async function navPage(ctx, next) {
    const isAuthenticated = sessionStorage.getItem('authToken');
    const email = sessionStorage.getItem('email');

    async function onLogout() {
        await logout();
        ctx.page.redirect('/')
    }
    render(navTemplate(isAuthenticated, email, onLogout), nav);
    next();

}
