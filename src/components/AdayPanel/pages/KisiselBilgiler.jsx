import React from 'react';
import { useForm } from 'react-hook-form';
import './BasvuruForm.css';  // Kişisel Bilgiler sayfası için CSS


const KisiselBilgiler = ({ onNext, onData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        onData(data);  // Veriyi üst bileşene gönder
        onNext();  // Sonraki adıma geç
    };

    return (
        <div>
            <h3>Kişisel Bilgiler</h3>

            <div className="form-group">
                <label htmlFor="ad">Ad</label>
                <input id="ad" {...register("ad", { required: "Ad zorunludur" })} />
                {errors.ad && <span className="error">{errors.ad.message}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="soyad">Soyad</label>
                <input id="soyad" {...register("soyad", { required: "Soyad zorunludur" })} />
                {errors.soyad && <span className="error">{errors.soyad.message}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="tc">T.C. Kimlik No</label>
                <input id="tc" {...register("tc", { required: "T.C. Kimlik No zorunludur" })} />
                {errors.tc && <span className="error">{errors.tc.message}</span>}
            </div>

            {/* Diğer kişisel bilgiler alanları */}
            <div className="form-group">
                <label htmlFor="dogumYeri">Doğum Yeri</label>
                <input id="dogumYeri" {...register("dogumYeri")} />
            </div>

            <div className="form-group">
                <label htmlFor="dogumTarihi">Doğum Tarihi</label>
                <input type="date" id="dogumTarihi" {...register("dogumTarihi")} />
            </div>

            {/* Geri ve Sonraki butonları */}
            <div className="form-group">
                <button type="submit" onClick={handleSubmit(onSubmit)}>Sonraki</button>
            </div>
        </div>
    );
};

export default KisiselBilgiler;
