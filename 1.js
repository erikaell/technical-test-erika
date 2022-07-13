function Hitungbarang(kualitas, qty) {
    if (kualitas == "A") {
        if (qty > 13 ) {
            const subtotal = 4550*qty 
            const potongan = 231*qty
            const total = subtotal-potongan
            return "- Total harga barang : " + subtotal + "\n- Potongan : " + potongan + "\n- Total yang harus dibayar : " + total;
        } else {
            const total = 4550*qty
            return "- Total harga barang : " + total + "\n- Total yang harus dibayar : " + total;  
        }
    }
    else if (kualitas == "B") {
        if (qty > 7) {
            const subtotal = 5330*qty 
            const potongan = subtotal*23/100
            const total = subtotal-potongan
            return "- Total harga barang : " + subtotal + "\n- Potongan : " + potongan + "\n- Total yang harus dibayar : " + total;           
        } else {
            const total = 5330*qty
            return "- Total harga barang : " + total + "\n- Total yang harus dibayar : " + total;            
        }
    }
    else if (kualitas == "C") {
        const total = 8653*qty
        return "- Total harga barang : " + total + "\n- Total yang harus dibayar : " + total;          
    }
    else {
        return "Kualitas barang tidak ada atau tidak terdaftar"
    }
}

console.log(Hitungbarang("C",15))