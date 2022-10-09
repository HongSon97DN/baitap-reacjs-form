import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

class FormSinhVien extends Component {

    inputChange = (event) => {
        let {value, name} = event.target;

        let newValues = {...this.props.sinhVien.values, [name]: value}
        let newErrors = {...this.props.sinhVien.errors}
        let errorMessage = "";

        let typeValue = event.target.getAttribute("typeinput");
        if (typeValue === "email") {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            if (!regex.test(value)) {
                errorMessage = "Email không đúng định dạng!";
            }
        } else if(typeValue === "sdt") {
            let regex = /^[0-9]+$/;
            if (!regex.test(value)) {
                errorMessage = "Số điện thoại phải là kiểu số!";
            }
        } else if(typeValue === "maSV") {
            let flag = false;
            flag = this.props.mangSV.some((sv) => {
                return sv.maSV === value.replaceAll(" ","");
            })
            if (flag) {
                errorMessage = "Mã sinh viên không được trùng!"
                console.log(errorMessage)
            }
        }
        if (value.trim() === "") {
            errorMessage = "Trường dữ liệu này không được để trống!";
        }
        newErrors[name] = errorMessage;

        let action = {
            type: "HANDLE_CHANGE",
            sinhVien: {
                values: newValues,
                errors: newErrors
            }
        }
        this.props.dispatch(action);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let isValid = true;

        for (const key in this.props.sinhVien.errors) {
            if (this.props.sinhVien.errors[key] !== "") {
                isValid = false;
                break;
            }
        }

        for (const key in this.props.sinhVien.values) {
            if (this.props.sinhVien.values[key] === "") {
                isValid = false;
                break;
            }
        }

        if (!isValid) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Dữ liệu chưa hợp lệ, bạn vui lòng thử lại!',
            });
            return;
        }
        
        let action = {
            type: "THEM_SINH_VIEN",
            sinhVien: this.props.sinhVien.values,
        }
        this.props.dispatch(action);
    }

    render() {
        let {values,errors} = this.props.sinhVien;
        return (
            <div>
                <h3 className='bg-dark text-white p-2 mt-5'>Thông tin sinh viên</h3>
                <form onSubmit={(event) => {
                    this.handleSubmit(event);
                }}>
                    <div className="row">
                        <div className='form-group col-6'>
                            <label>Mã SV</label>
                            <input onChange={(event) => {
                                this.inputChange(event)
                            }} value={values.maSV} typeinput="maSV" name="maSV" type="text" className='form-control'/>
                            <span className='text-danger'>{errors.maSV}</span>
                        </div>
                        <div className='form-group col-6'>
                            <label>Họ tên</label>
                            <input  onChange={(event) => {
                                this.inputChange(event)
                            }} value={values.hoTen} name="hoTen" type="text" className='form-control'/>
                            <span className='text-danger'>{errors.hoTen}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className='form-group col-6'>
                            <label>Số điện thoại</label>
                            <input onChange={(event) => {
                                this.inputChange(event)
                            }} value={values.sdt} typeinput="sdt" name="sdt" type="text" className='form-control' />
                            <span className='text-danger'>{errors.sdt}</span>
                        </div>
                        <div className='form-group col-6'>
                            <label>Email</label>
                            <input onChange={(event) => {
                                this.inputChange(event)
                            }} value={values.email} typeinput="email" name="email" type="text" className='form-control'/>
                            <span className='text-danger'>{errors.email}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-12 text-right'>
                            <button onClick={() => {
                                let action = {
                                    type:"CAP_NHAT",
                                    svUpdate: this.props.sinhVien.values
                                }
                                this.props.dispatch(action);
                            }} type='button' className='btn btn-info mr-3'>Cập nhật</button> 
                            <button className='btn btn-success'>Thêm sinh viên</button> 
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (rootReducer) => {
    return {
        mangSV: rootReducer.DanhSachSinhVienReducer.mangSV,
        sinhVien: rootReducer.DanhSachSinhVienReducer.sinhVien,
    }
}

export default connect(mapStateToProps)(FormSinhVien);
