const initialState = {
  mangSV: [{maSV: "sv1", hoTen: "Nguyễn Nam", sdt: "90909397989", email: "nguyennam@gmail.com"},
  {maSV: "sv2", hoTen: "hoa", sdt: "090909397989", email: "hoa@gmail.com"},
  {maSV: "sv3", hoTen: "nga", sdt: "090909397989", email: "nga@gmail.com"}
],
  chiTietSV:{maSV: "", hoTen: "", sdt: "", email: "" },
  mangSVTK:[]
}

export const DanhSachSinhVienReducer = (state = initialState, action) => {
  switch (action.type) {

    case "THEM_SINH_VIEN":
      state.mangSV = [...state.mangSV,action.sinhVien]
      return { ...state }

    case "XEM_CHI_TIET":
      document.getElementById("maSV").setAttribute("disabled", true) 
      document.getElementById("btnUpdate").classList.remove("update") 
      document.getElementById("btnAddSV").style.display = "none" 
      state.chiTietSV = action.svDetail
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
      state.chiTietSV = action.svUpdate;
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


