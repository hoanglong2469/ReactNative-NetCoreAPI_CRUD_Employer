//#########################################
// # Copyright (C) 2022-2023, ASoft JSC. All Rights Reserved.
// #
// # History：
// Date Time Updated Content
// # 06/01/2023 Hoàng Long Tạo mới
///#########################################

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MobileBackends.Models;


// < summary>
/// Class NhanVienController nhận request,thực thi logic của ứng dụng
/// < /summary>
namespace MobileBackends.Controllers
{
    // < summary>
    /// Tạo bộ định tuyến 
    /// < /summary>
    [Route("v1/api/[controller]")]
    [ApiController]

    public class NhanVienController : ControllerBase
    {
        private readonly QlnvContext _context;

        public NhanVienController(QlnvContext context)
        {
            _context = context;
        }

        /// < summary>
        ///  Request đọc
        /// < /summary>
        /// < param name="ToListAsyns">lấy về tất cả các dữ liệu (List) của bảng</param>
        ///< history>
        /// Hoàng Long Created 06/01/2023
        ///< /history>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NhanVien>>> GetNhanVien()
        {
            if (_context.NhanVien == null)
            {
                return NotFound();
            }
            return await _context.NhanVien.ToListAsync();
        }

        /// < summary>
        ///  Request lấy thông tin của 1 nhân viên theo id
        /// < /summary>
        /// < param name="FindAsync">tìm theo id các dữ liệu (List) của bảng</param>
        ///< history>
        /// Hoàng Long Created 06/01/2023
        ///< /history>
        [HttpGet("{id}")]
        public async Task<ActionResult<NhanVien>> GetNhanVien(string id)
        {
            if (_context.NhanVien == null)
            {
                return NotFound();
            }
            var nhanvien = await _context.NhanVien.FindAsync(id);
            if (nhanvien == null)
            {
                return NotFound();
            }
            return nhanvien;

        }

        /// < summary>
        ///  Request thêm 1 nhân viên 
        /// < /summary>
        /// < param name="Add">Chèn 1 đối tượng</param>
        /// < param name="SaveChangesAsync">Cập nhật dữ liệu vào </param>
        ///< history>
        /// Hoàng Long Created 06/01/2023
        ///< /history>
        [HttpPost]
        public async Task<ActionResult<NhanVien>> PostNhanVien(NhanVien nhanvien)
        {
            _context.NhanVien.Add(nhanvien);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNhanVien), new { id = nhanvien.Id }, nhanvien);
        }

        /// < summary>
        ///  Request sửa thông tin 1 nhân viên biết 
        /// < /summary>
        /// < param name="_context.Entry(nhanvien).State = EntityState.Modified;">Gán thực thể vào lớp DbContext</param>
        /// < param name="SaveChangesAsync">Cập nhật dữ liệu vào sql </param>
        ///< history>
        /// Hoàng Long Created 06/01/2023
        ///< /history>
        [HttpPut("{id}")]
        public async Task<ActionResult> PutNhanVien(string id, NhanVien nhanvien)
        {
            if (id != nhanvien.Id)
            {
                return BadRequest();
            }

            _context.Entry(nhanvien).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return Ok();
        }

        /// < summary>
        ///  Request xoá thông tin 1 nhân viên theo id
        /// < /summary>
        /// < param name="Remove">Phương thức xoá dữ liệu</param>
        /// < param name="SaveChangesAsync">Cập nhật dữ liệu vào sql </param>
        ///< history>
        /// Hoàng Long Created 06/01/2023
        ///< /history>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteNhanVien(string id)
        {
            if (_context.NhanVien == null)
            {
                return NotFound();
            }
            var nhanvien = await _context.NhanVien.FindAsync(id);
            if (nhanvien == null)
            {
                return NotFound();
            }
            _context.NhanVien.Remove(nhanvien);
            await _context.SaveChangesAsync();

            return Ok();

        }

    }
}
