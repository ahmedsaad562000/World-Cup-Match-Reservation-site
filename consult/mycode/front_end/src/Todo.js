import {useState} from 'react';

import Modal from "./Modal";
import Backdrop from "./Backdrop";


function Todo(props) {
    const [modalIsOpen, SetModalIsOpen] = useState(false);

    function buyHandler(){
        SetModalIsOpen(true);
    }

    function closeModalHandler()
    {
        SetModalIsOpen(false);
    }

    return (
        <div>
            <h1>{props.text}</h1>
            <div>
                <h2>{props.text1}</h2>
                <button className="btn" onClick={buyHandler}>Buy Now</button>
            </div>

            {modalIsOpen && <Modal onCancel={closeModalHandler} onConfirm={closeModalHandler} />}
            {modalIsOpen && <Backdrop oncCancel={closeModalHandler} />}

        </div>
    );
}

export default Todo;