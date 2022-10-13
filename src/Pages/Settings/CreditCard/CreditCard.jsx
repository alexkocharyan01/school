import React, {useState} from 'react';
import "./CreditCard.scss";
import Cards from 'react-credit-cards';
import "./styles-compiled.css";

function CreditCard() {

    const data = {
        cvc: "",
        expiry: "",
        focus: "",
        name: "",
        number: "",
    };

    const [cardDetails, setCardDetails] = useState(data);

    const handleInputFocus = (e) => {
        setCardDetails({...cardDetails, focus: e.target.name});
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        let valueData
        if (name !== "name") {
            valueData = value.replace(/\D/g, "")
        } else {
            valueData = value.replace(/[0-9]/, "")
        }
        setCardDetails({...cardDetails, [name]: valueData});
    };

    return (
        <div className="credit_card">
            <div className="credit_card_container">
                <div className="card">
                    <Cards
                        cvc={cardDetails.cvc}
                        expiry={cardDetails.expiry}
                        focused={cardDetails.focus}
                        name={cardDetails.name}
                        number={cardDetails.number}
                    />
                </div>
                <div className="form_div">
                    <div className="form">
                        <div className="top r">
                            <div className="number">
                                <p>Number</p>
                                <input
                                    type="text"
                                    name="number"
                                    placeholder="Card Number"
                                    value={cardDetails.number}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    maxLength={16}
                                />
                            </div>
                            <div className="name">
                                <p>Name</p>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={cardDetails.name}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                />
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="valid input_container">
                                <p>Valid Thru</p>
                                <input
                                    type="text"
                                    name="expiry"
                                    placeholder="MM/YY Expiry"
                                    value={cardDetails.expiry}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    maxLength={4}
                                />
                            </div>
                            <div className="cvc input_container">
                                <div className="cvc_title">
                                    <p>CVC</p>
                                </div>
                                <input
                                    type="tel"
                                    name="cvc"
                                    placeholder="CVC"
                                    value={cardDetails.cvc}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    maxLength={3}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="credit_card_button">
                    <button>
                        <p>
                            Save
                        </p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreditCard
