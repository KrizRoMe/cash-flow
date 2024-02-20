interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function Modal({ isOpen, onClose }: ModalProps) {
    return (
        <article className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-zinc-900 bg-opacity-50 z-50">
            <div className="p-6 rounded-lg bg-black space-y-4">
                <div className="text-right">
                    <button onClick={onClose}>X</button>
                </div>
                <form className="space-y-4">
                    <section className="inputs grid grid-rows-2 grid-flow-col gap-2">
                        <div>
                            <label htmlFor="description" className="block mb-1">Descripción</label>
                            <input type="text" name="description" id="description" className="rounded-md border-0 p-2 bg-zinc-800" required/>
                        </div>
                        <div>
                            <label htmlFor="ammount" className="block mb-1">Monto</label>
                            <input type="text" name="ammount" id="ammount" className="rounded-md border-0 p-2 bg-zinc-800" placeholder="0.00" required />
                        </div>
                        <div>
                            <label htmlFor="date" className="block mb-1">Fecha</label>
                            <input type="date" name="date" id="date" className="rounded-md border-0 p-2 bg-zinc-800 w-full" required />
                        </div>
                        <div>
                            <label htmlFor="payment_method" className="block mb-1">Método de Pago</label>
                            <select name="payment_method" id="payment_method" className="rounded-md border-0 p-2 bg-zinc-800 w-full" defaultValue="" required>
                                <option value="">Seleccione M.Pago</option>
                                <option value="efectivo">Efectivo</option>
                                <option value="tarjeta">Yape</option>
                            </select>
                        </div>
                    </section>
                    <section className="text-center">
                        <button type="submit" className="px-4 py-2 bg-zinc-800 rounded-md">Guardar</button>
                    </section>
                </form>
            </div>
        </article>
    )
}

export default Modal
