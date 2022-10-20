import { html } from '../../node_modules/lit-html/lit-html.js';
import { getPOById, editPO } from '../api/data.js';


const editTemplate = (PO, onSubmit) => html`
<section id="edit-PO">
    <form @submit=${onSubmit} id="edit-form">
        <h1>Edit PO</h1>
        <div class="container">
            <label for="PO_Number">PO Number</label>
            <input id="PO_Number" type="text" placeholder="Enter PO" name="PO_Number" .value=${PO.PO_Number}>
            <label for="Supplier">Supplier</label>
            <textarea id="Supplier" placeholder="Enter Description" name="Supplier" .value=${PO.Supplier}></textarea>
            <label for="Event">Event</label>
            <input id="Event" type="text" placeholder="Enter Event" name="Event" .value=${PO.Event}>
            <label for="StockType">Stock Type</label>
            <input id="StockType" type="text" placeholder="Enter Stock Type" name="StockType" .value=${PO.StockType}>
            <label for="Remarks">Remarks</label>
            <textarea id="Remarks" name="Remarks" .value=${PO.Remarks}></textarea>
            <input type="submit" class="registerbtn button" value="Edit PO">
        </div>
    </form>
</section>`;

export async function editPage(ctx) {
    const PO = await getPOById(ctx.params.id);


    ctx.render(editTemplate(PO, onSubmit))

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const PO_Number = formData.get('PO_Number').trim();
        const Supplier = formData.get('Supplier').trim();
        const Event = formData.get('Event').trim();
        const StockType = formData.get('StockType').trim();
        const Remarks = formData.get('Remarks').trim();

        try {
            if (PO_Number == '' || Supplier == '' || Event == '' || StockType == '' || Remarks == '') {
                throw new Error('All fields are required!');
            }

            await editPO(PO._id, { PO_Number, Supplier, Event, StockType, Remarks });

            event.target.reset();

            ctx.page.redirect(`/all-POs`);
        } catch (error) {
            alert(error.message);
        }
    }
}