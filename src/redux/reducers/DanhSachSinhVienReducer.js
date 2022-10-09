const initialState = {
  mangSV: [{ maSV: "1", hoTen: "Nguyễn Nam", sdt: "090909397989", email: "nguyennam@gmail.com" },
  { maSV: "2", hoTen: "hoa", sdt: "090909397989", email: "nguyennam@gmail.com" },
  { maSV: "3", hoTen: "nga", sdt: "090909397989", email: "nguyennam@gmail.com" }
],
  sinhVien: {
    values: {
      maSV: "",
      hoTen: "",
      sdt: "",
      email: ""
    },
    errors: {
      maSV: "",
      hoTen: "",
      sdt: "",
      email: ""
    }
  },
  mangSVTK:[]
}

export const DanhSachSinhVienReducer = (state = initialState, action) => {
  switch (action.type) {
    case "HANDLE_CHANGE":
      state.sinhVien = action.sinhVien;
      return { ...state }

    case "THEM_SINH_VIEN":
      state.mangSV = [...state.mangSV,action.sinhVien]
      return { ...state }
    
    case "XEM_CHI_TIET":
      state.sinhVien.values = action.svDetail
      state.sinhVien = {...state.sinhVien}
      return {...state}

    case "XOA_SV":
      state.mangSV = state.mangSV.filter(sv => sv.maSV !== action.maSV);
      return {...state}

    case "CAP_NHAT":
      let svIndex = state.mangSV.findIndex(sv => sv.maSV === action.svUpdate.maSV)
      if (svIndex !== -1) {
        state.mangSV[svIndex] = action.svUpdate;
      }
      state.mangSV = [...state.mangSV]
      return {...state}

    case "TIM_KIEM":
      if (action.keySearch) {
          let searchName = state.mangSV.filter((sv) => {
            return sv.hoTen.toLocaleLowerCase().includes((action.keySearch).toLocaleLowerCase().trim());
          })
          state.mangSVTK = searchName;
      } else {
          state.mangSVTK = []
      }
      return {...state}
    default: {
      return { ...state }
    }
      
  }
}


