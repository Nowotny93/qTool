import { html } from '../../node_modules/lit-html/lit-html.js';

const homeTemplate = () => html`
<section id="main">
    <div id="welcome-container">
        <h1>Welcome to qTool</h1>
        <img class="hero" src="/images/quality-png.webp" alt="carIntro">
        <h2>Login to see our POs right away!</h2>
    </div>
</section>`;

export async function homePage(ctx) {
    ctx.render(homeTemplate());

    console.log('home page');

}