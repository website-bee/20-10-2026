
 // MSSV luôn là chuỗi, giữ nguyên cả số 0 ở đầu.
 // Các bạn trong lớp dùng lời chúc chung; ba bạn cuối có thư riêng từ Lâm.
 // Muốn viết riêng cho ai: thay defaultLetter(...) của bạn ấy bằng `toàn bộ bức thư`.
 // Các đoạn và dấu xuống dòng trong thư sẽ được giữ nguyên.
 const defaultLetter = name => `Gửi ${name},

Nhân ngày 20/10, các bạn nam lớp ĐTVT chúc bạn luôn xinh đẹp, vui vẻ và khỏe mạnh. Chúc bạn học tốt, thi cử suôn sẻ và làm được những điều mình dự định.

Mong hôm nay bạn sẽ nhận được nhiều hoa, nhiều quà và có một ngày thật vui bên bạn bè, người thân.

Các bạn nam lớp ĐTVT`;

const students = [
  { mssv: "0", name: "Cô gái ĐTVT", letter: defaultLetter("Cô gái ĐTVT") },
  {
    mssv: "26200002",
    name: "Khúc Nguyễn Minh Anh",
    letter: defaultLetter("Khúc Nguyễn Minh Anh")
  },
  {
    mssv: "26200012",
    name: "Nguyễn Ngọc Cần",
    letter: defaultLetter("Nguyễn Ngọc Cần")
  },
  {
    mssv: "26200019",
    name: "Vũ Thị Ngọc Diệp",
    letter: defaultLetter("Vũ Thị Ngọc Diệp")
  },
  {
    mssv: "26200024",
    name: "Nguyễn Thị Ánh Dương",
    letter: defaultLetter("Nguyễn Thị Ánh Dương")
  },
  {
    mssv: "26200026",
    name: "Nguyễn Thị Mỹ Duyên",
    letter: defaultLetter("Nguyễn Thị Mỹ Duyên")
  },
  {
    mssv: "26200027",
    name: "Nguyễn Hoàng Huỳnh Giao",
    letter: defaultLetter("Nguyễn Hoàng Huỳnh Giao")
  },
  {
    mssv: "26200028",
    name: "Nông Thị Thu Hằng",
    letter: defaultLetter("Nông Thị Thu Hằng")
  },
  {
    mssv: "26200054",
    name: "Cao Khánh Huyền",
    letter: defaultLetter("Cao Khánh Huyền")
  },
  {
    mssv: "26200061",
    name: "Nguyễn Mai Khanh",
    letter: defaultLetter("Nguyễn Mai Khanh")
  },
  {
    mssv: "26200121",
    name: "Nguyễn Thị Minh Thư",
    sender: "Lâm đẹp zai",
    letter: `Gửi bạn tôi — Minh Thư,

20/10 vui vẻ nha bạn tôi :)) Chúc bạn Thưc cười sảng thật nhiều, học hành suôn sẻ và có thời gian làm những điều mình thích.

Đây là món quà nhỏ do chính tay Tao Lâm làm gửi riêng cho đó. Hoa trên này không có mùi thơm, nhưng lời chúc thì có tâm nha :)) Mong mở quà xong bạn sẽ vui thêm một chút.

Chúc bạn tôi hôm nay nhận được nhiều yêu thương, có món ngon để ăn, chúc sớm có người để cười cùng và có thật nhiều chuyện vui để kể. Những ngày sau cũng vui như vậy luôn!

Bạn của Thư,
Lâm đẹp zai`
  },
  {
    mssv: "26200125",
    name: "Phạm Thị Thủy Tiên",
    sender: "Lâm đẹp zai",
    letter: `Gửi bạn tôi — Phạm Thị Thủy Tiên,

  20/10 tới rồi, chúc Tiên luôn xinh đẹp, vui vẻ và tự tin với những điều mình chọn nha! Đặc biệt, chúc Tiên mau khỏe lại, có thật nhiều sức khỏe và luôn giữ được tinh thần lạc quan. Mong rằng những ngày sắp tới sẽ nhẹ nhàng hơn với bạn, có thêm thật nhiều niềm vui và những chuyện nhỏ xíu khiến bạn bật cười :))

  Đây là bài do Lâm đẹp zai này làm đấy gói ghém thành một món quà nho nhỏ gửi riêng cho bạn. Quà online nên không cần tìm chỗ cất, bạn cứ nhận hết hoa với lời chúc là được nha :))

  Không biết sắp tới có còn được gặp Tiên ở ltrường nữa không, nhưng dù bạn có lựa chọn con đường nào đi nữa, mình vẫn mong mọi chuyện sẽ thật tốt đẹp với bạn. Trước mắt cứ ưu tiên sức khỏe, nghỉ ngơi thật tốt và đừng tạo quá nhiều áp lực cho bản thân nhé. Chuyện học hành hay những dự định khác rồi sẽ có cách, quan trọng nhất vẫn là bạn khỏe mạnh và vui vẻ.

  Hy vọng một ngày không xa, tụi mình lại có dịp gặp nhau, ngồi nói chuyện và cười cợt :)). Dù sau này mỗi người có một hành trình riêng thì vẫn mong Tiên luôn gặp được những người tốt và có thật nhiều điều đáng nhớ.

  Chúc bạn tôi một ngày 20/10 thật ý nghĩa, mau khỏe và luôn bình an nhé! Hẹn gặp lại vào một ngày không xa :))

  **Thân gửi Tiên,  
  Lâm🌷**`
  }
];
