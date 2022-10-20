import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';


//@submit=${onSubmit}
const registerTemplate = (onSubmit) => html`
<section id="register">
    <form @submit=${onSubmit} id="register-form">
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="/login">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>`;

export async function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const username = formData.get('username').trim();
        const password = formData.get('password').trim();
        const repeatPass = formData.get('repeatPass').trim();

        try {
            if (!username || !password) {
                throw new Error('All fields are required!');
            }

            if (password != repeatPass) {
                throw new Error('Passwords don\'t match!');
            }

            await register(username, password);

            ctx.setUserNav();
            ctx.page.redirect('/all-POs');
        } catch (error) {
            alert(error.message)
        }
    }
}