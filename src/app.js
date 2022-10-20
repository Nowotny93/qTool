import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';

import { logout as apiLogout } from './api/data.js'
import {homePage} from './views/home.js';
import {registerPage} from './views/register.js';
import {loginPage} from './views/login.js';
import {allPOsPage} from './views/catalog.js';
import {createPage} from './views/create.js';
import {editPage} from './views/edit.js';
import {profilePage} from './views/profile.js';
import {searchPage} from './views/search.js';


const main = document.querySelector('main');
setUserNav()
document.getElementById('logoutBtn').addEventListener('click', logout)

page('/', decorateContext, homePage);
page('/register', decorateContext, registerPage)
page('/login', decorateContext, loginPage)
page('/all-POs', decorateContext, allPOsPage)
page('/create', decorateContext, createPage)
page('/edit/:id', decorateContext, editPage);
page('/profile', decorateContext, profilePage);
page('/search', decorateContext, searchPage);

page.start()

function decorateContext(ctx, next) {

    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const username = sessionStorage.getItem('username');

    if (username != null) {
        document.getElementById('welcomeMessage').textContent = `Welcome, ${username}`;

        document.getElementById('profile').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

async function logout(){
    await apiLogout();
    setUserNav();
    page.redirect('/')
}