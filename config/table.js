const createAdminTable = `
      CREATE TABLE IF NOT EXISTS admin (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        profile_image VARCHAR(255),
        password VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NULL
      )
    `;

const createContactTable = `
      CREATE TABLE IF NOT EXISTS contact (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NULL
      )
    `;

const createDoctorTable = `
  CREATE TABLE doctors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    gender ENUM('Male', 'Female', 'Other'),
    dob DATE,
    specialization VARCHAR(100),
    qualification VARCHAR(255),
    experience_years INT,
    bio TEXT,
    consultation_fee DECIMAL(10,2),
    available_days VARCHAR(50),
    available_time VARCHAR(50),
    profile_image VARCHAR(255),
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    created_by INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
`;

const createAppointmentTable = `
CREATE TABLE appointments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  patient_name VARCHAR(100) NOT NULL,
  patient_email VARCHAR(100),
  patient_phone VARCHAR(15),
  doctor_id INT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status ENUM('Pending', 'Accepted', 'Rejected', 'Confirmed', 'Cancelled') DEFAULT 'Pending',
  reason TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;
`;

const DoctorAvailabilityTable = `CREATE TABLE doctor_schedule (
  id INT PRIMARY KEY AUTO_INCREMENT,
  doctor_id INT NOT NULL,
  available_date DATE NOT NULL, 
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  break_start TIME,
  break_end TIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
) ENGINE=InnoDB;
`;
