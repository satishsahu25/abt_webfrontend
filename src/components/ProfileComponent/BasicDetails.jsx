import React from "react";
import { Settings ,Copy} from 'lucide-react';
export default function BasicDetails() {
  return (
    <section className="details-panel">
      <div className="details-grid">
        <div>
          <label>Name</label>
          <p>Satish Sahu</p>
        </div>
        <div>
          <label>PAN</label>
          <p>******832G</p>
        </div>

        <div>
          <label>Date of Birth (DD/MM/YYYY)</label>
          <p>**/**/2002</p>
        </div>
        <div>
          <label>Gender</label>
          <p>Male</p>
        </div>

        <div>
          <label>Mobile Number</label>
          <p>*****61412</p>
        </div>
        <div>
          <label>Marital Status</label>
          <p>Single</p>
        </div>

        <div>
          <label>Email</label>
          <p>sat*******9@gmail.com</p>
        </div>
        <div>
          <label>Unique Client Code</label>
          <p className="copy-code">
            7076980583 <Copy size={16} className="icon" />
          </p>
        </div>

        <div>
          <label>Father's Name</label>
          <p>Sri Ram Sahu</p>
        </div>
        <div>
          <label>Income Range</label>
          <p>Below 1 Lac</p>
        </div>

        <div>
          <label>Demat Acc Number / BOID</label>
          <p className="copy-code">
            1208870244683130 <Copy size={16} className="icon" />
          </p>
        </div>
      </div>
    </section>
  );
}
