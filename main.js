const CONFIG = {
    animationDelay: 0.2,
    scrollOffset: 100,
    defaultLanguage: 'az',
    translations: {
        az: {
            'contact': 'Əlaqə',
            'education': 'Təhsil',
            'skills': 'Bacarıqlar',
            'languages': 'Dillər',
            'profile': 'Profil',
            'experience': 'Təcrübə',
            'references': 'İstinadlar',
            'download-pdf': 'PDF Yüklə',
            'contact-form': 'Əlaqə Formu',
            'name': 'Ad Soyad',
            'email': 'E-poçt',
            'message': 'Mesaj',
            'send': 'Göndər',
            'close': 'Bağla',
            phone: "Telefon",
            address: "Ünvan",
            website: "Vebsayt",
            school: "Məktəb",
            period: "Dövr",
            degree: "Dərəcə",
            gpa: "GPA",
            link: "Link",
            skill: "Bacarıq",
            language: "Dil",
            title: "Başlıq",
            company: "Şirkət",
            companyLink: "Şirkət Linki",
            description: "Təsvir",
            position: "Vəzifə",
            add: "Əlavə et",
            remove: "Sil",
            save: "Yadda saxla",
            cancel: "Ləğv et",
            edit: "Redaktə et"
        },
        en: {
            'contact': 'Contact',
            'education': 'Education',
            'skills': 'Skills',
            'languages': 'Languages',
            'profile': 'Profile',
            'experience': 'Experience',
            'references': 'References',
            'download-pdf': 'Download PDF',
            'contact-form': 'Contact Form',
            'name': 'Full Name',
            'email': 'Email',
            'message': 'Message',
            'send': 'Send',
            'close': 'Close',
            phone: "Phone",
            address: "Address",
            website: "Website",
            school: "School",
            period: "Period",
            degree: "Degree",
            gpa: "GPA",
            link: "Link",
            skill: "Skill",
            language: "Language",
            title: "Title",
            company: "Company",
            companyLink: "Company Link",
            description: "Description",
            position: "Position",
            add: "Add",
            remove: "Remove",
            save: "Save",
            cancel: "Cancel",
            edit: "Edit"
        }
    }
};

const AnimationManager = {
    init() {
        this.setupScrollAnimations();
        this.setupClickEffects();
    },

    setupScrollAnimations() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach((element, index) => {
            element.style.animationDelay = `${index * CONFIG.animationDelay}s`;
        });

        window.addEventListener('scroll', () => {
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - CONFIG.scrollOffset) {
                    element.classList.add('visible');
                }
            });
        });

        window.dispatchEvent(new Event('scroll'));
    },

    setupClickEffects() {
        const clickableElements = document.querySelectorAll('a');
        clickableElements.forEach(element => {
            element.classList.add('click-effect');
        });
    }
};

const ThemeManager = {
    init() {
        this.loadSavedTheme();
        this.setupThemeToggle();
    },

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
    },

    setTheme(theme) {
        document.body.classList.toggle('dark-theme', theme === 'dark');
        const themeButton = document.querySelector('.theme-toggle');
        if (themeButton) {
            themeButton.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
        localStorage.setItem('theme', theme);
    },

    setupThemeToggle() {
        const toggleButton = document.querySelector('.theme-toggle');
        if (toggleButton) {
            toggleButton.onclick = () => {
                const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
                this.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
            };
        }
    }
};

const LanguageManager = {
    currentLanguage: CONFIG.defaultLanguage,

    init() {
        this.loadSavedLanguage();
        this.setupLanguageToggle();
    },

    loadSavedLanguage() {
        const savedLanguage = localStorage.getItem('language') || CONFIG.defaultLanguage;
        this.setLanguage(savedLanguage);
    },

    setLanguage(lang) {
        this.currentLanguage = lang;
        document.documentElement.lang = lang;
        this.updateTexts();
        localStorage.setItem('language', lang);

        if (document.querySelector('.edit-modal')) {
            const currentSection = document.querySelector('.edit-modal-content h2').textContent.toLowerCase().split(' ')[0];
            DataManager.populateEditForm(currentSection);
        }

        DataManager.setupEditButtons();
    },

    updateTexts() {
        const translations = CONFIG.translations[this.currentLanguage];
        Object.keys(translations).forEach(key => {
            const elements = document.querySelectorAll(`[data-translate="${key}"]`);
            elements.forEach(element => {
                element.textContent = translations[key];
            });
        });

        if (this.currentLanguage === 'en') {
            CV_DATA.personalInfo.jobTitle = "Web & Game Developer | Programmer | InfoSec Specialist";
            CV_DATA.profile = "I am an experienced specialist in setting up security systems and managing IT infrastructure. I have skills in Windows and Linux systems, network security, and data protection. Additionally, I have knowledge in both backend and frontend web programming. I have experience in creating websites from scratch, writing programs, and developing PC or mobile games.";
            
            CV_DATA.experience[0].title = "Freelance Web Designer";
            CV_DATA.experience[0].period = "2023 - Present";
            CV_DATA.experience[0].company = "Remote";
            CV_DATA.experience[0].description = [
                "Designed and developed responsive websites using HTML, CSS, and JavaScript.",
                "Collaborated with clients to understand UI/UX needs and present optimized solutions.",
                "Integrated SEO best practices and ensured cross-browser compatibility."
            ];

            CV_DATA.experience[1].title = "Founder & Lead Game Developer";
            CV_DATA.experience[1].period = "2026 - Present";
            CV_DATA.experience[1].description = [
                "Founded Rey Studio to develop creative and immersive gaming experiences for PC and mobile platforms.",
                "Designed and programmed game mechanics, character systems, and level designs using Unity and C#.",
                "Led a small team of artists and programmers, managed development cycles, and oversaw publishing processes."
            ];

            CV_DATA.experience[2].title = "Cybersecurity Specialist";
            CV_DATA.experience[2].description = [
                "Assisted in monitoring network activity and detecting potential threats.",
                "Learned the basics of penetration testing and participated in internal audits.",
                "Worked with open-source OSINT tools to collect and analyze public information."
            ];

            CV_DATA.education[0].school = "Azerbaijan Technical University";
            CV_DATA.education[0].degree = "BSc Cybersecurity";
            CV_DATA.education[1].degree = "MSc Computer Science";

            CV_DATA.skills = [
                "HTML & CSS",
                "JavaScript",
                "Python",
                "C++ / C#",
                "Responsive Web Design",
                "Game Development (Unity / Unreal Engine)",
                "Cybersecurity Principles",
                "Network Security",
                "Information Security Management"
            ];

            CV_DATA.languages = [
                "Azerbaijani (Native)",
                "English (Intermediate)",
                "Turkish (Fluent)",
                "Spanish (Basic)"
            ];

            CV_DATA.references[0].position = "SkyTech / Information Security Manager";
            CV_DATA.references[1].position = "Rey Studio / Game Artist";
        } else {
            CV_DATA.personalInfo.jobTitle = "Veb & Oyun Tərtibatçı | Proqramçı | İnfoSec Mütəxəssis";
            CV_DATA.profile = "Təhlükəsizlik sistemlərinin qurulması və İT infrastrukturunun idarə edilməsi sahəsində təcrübəli mütəxəssisəm. Windows və Linux sistemləri, şəbəkə təhlükəsizliyi və məlumatların qorunması sahələrində bacarıqlarım var. Bundan əlavə, həm backend, həm də frontend veb proqramlaşdırma biliklərim var. Sıfırdan vebsaytlar yaratmaq, proqramlar yazmaq və PC və ya mobil oyunlar inkişaf etdirmək təcrübəm var.";

            CV_DATA.experience[0].title = "Freelance Veb Dizayner";
            CV_DATA.experience[0].period = "2023 - Günümüzə qədər";
            CV_DATA.experience[0].company = "Uzaqdan";
            CV_DATA.experience[0].description = [
                "HTML, CSS və JavaScript istifadə edərək responsiv vebsaytlar dizayn edib və inkişaf etdirdim.",
                "Müştərilərlə UI/UX ehtiyaclarını başa düşmək və optimallaşdırılmış həllər təqdim etmək üçün əməkdaşlıq etdim.",
                "SEO ən yaxşı təcrübələrini inteqrasiya etdim və brauzerlərarası uyğunluğu təmin etdim."
            ];

            CV_DATA.experience[1].title = "Qurucu & Baş Oyun Dizayneri";
            CV_DATA.experience[1].period = "2026 - Günümüzə qədər";
            CV_DATA.experience[1].description = [
                "PC və mobil platformalar üçün yaradıcı və immersiv oyun təcrübələri inkişaf etdirmək üçün Rey Studio-nu qurdum.",
                "Unity və C# istifadə edərək oyun mexanikası, personaj sistemləri və səviyyə dizaynlarını dizayn edib proqramlaşdırdım.",
                "Kiçik bir rəssam və proqramçı komandasına rəhbərlik etdim, inkişaf dövrlərini idarə etdim və nəşr proseslərini nəzarət etdim."
            ];

            CV_DATA.experience[2].title = "Kiber Təhlükəsizlik Mütəxəssisi";
            CV_DATA.experience[2].description = [
                "Şəbəkə fəaliyyətini monitorinq etməkdə və potensial təhlükələri aşkarlamaqda kömək etdim.",
                "Penetrasiya testlərinin əsaslarını öyrəndim və daxili auditlərdə iştirak etdim.",
                "İctimai məlumatları toplamaq və təhlil etmək üçün açıq mənbəli OSINT alətləri ilə işlədim."
            ];

            CV_DATA.education[0].school = "Azərbaycan Texniki Universiteti";
            CV_DATA.education[0].degree = "BSc Kiber Təhlükəsizlik";
            CV_DATA.education[1].degree = "MSc Computer Science";

            CV_DATA.skills = [
                "Html & Css",
                "JavaScript",
                "Python",
                "C++ / C#",
                "Responsive Veb Dizayn",
                "Oyun Dizaynı (Unity / Unreal Engine)",
                "Kiber Təhlükəsizlik Prinsipləri",
                "Şəbəkə Təhlükəsizliyi",
                "İnformasiya Təhlükəsizliyi İdarəetməsi"
            ];

            CV_DATA.languages = [
                "Azərbaycan (Ana dili)",
                "İngilis (Orta)",
                "Türk (Sərbəst)",
                "İspan (Başlanğıc)"
            ];

            CV_DATA.references[0].position = "SkyTech / İnformasiya Təhlükəsizliyi Meneceri";
            CV_DATA.references[1].position = "Rey Studio / Oyun Rəssamı";
        }

 
        DataManager.renderData();
    },

    setupLanguageToggle() {
        const toggleButton = document.querySelector('.language-toggle');
        if (toggleButton) {
            toggleButton.onclick = () => {
                const newLang = this.currentLanguage === 'az' ? 'en' : 'az';
                this.setLanguage(newLang);
            };
        }
    }
};

const PDFManager = {
    init() {
        const downloadButton = document.querySelector('.download-pdf');
        if (downloadButton) {
            downloadButton.addEventListener('click', this.downloadPDF);
        }
    },

    downloadPDF() {
        const element = document.querySelector('.cv-container');
        const opt = {
            margin: 1,
            filename: 'cv.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    }
};

const ContactFormManager = {
    init() {
        this.setupForm();
    },

    setupForm() {
        const form = document.getElementById('contactFormElement');
        if (form) {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    },

    openForm() {
        document.getElementById('overlay').classList.add('active');
        document.getElementById('contactForm').classList.add('active');
    },

    closeForm() {
        document.getElementById('overlay').classList.remove('active');
        document.getElementById('contactForm').classList.remove('active');
    },

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        console.log('Form göndərildi:', formData);

        e.target.reset();
        this.closeForm();
    }
};

const CV_DATA = {
    personalInfo: {
        name: "MİRFAZİL YUSİFLİ",
        jobTitle: "Veb & Oyun Tərtibatçı | Proqramçı | İnfoSec Mütəxəssis",
        profileImage: "https://i.pinimg.com/736x/24/cc/88/24cc88ebbf5e1429ea093e93e0065535.jpg"
    },
    contact: {
        phone: "+994 50 424 65 82",
        email: "mirfazilyusifli@mail.ru",
        address: "Bakı, Yasamal, Nəzim Hikmət 32",
        website: "www.magiclibrary.info"
    },
    education: [
        {
            school: "Azərbaycan Texniki Universiteti",
            period: "2024 - 2028",
            degree: "BSc Kiber Təhlükəsizlik",
            gpa: "8.8 / 10.0",
            link: "https://aztu.edu.az"
        },
        {
            school: "Delft University of Technology",
            period: "2028 - 2030",
            degree: "MSc Computer Science",
            gpa: "3.6 / 4.0",
            link: "https://www.tudelft.nl/en"
        }
    ],
    skills: [
        "Html & Css",
        "JavaScript",
        "Python",
        "C++ / C#",
        "Responsive Veb Dizayn",
        "Oyun Dizaynı (Unity / Unreal Engine)",
        "Cybersecurity Principles",
        "Network Security",
        "Information Security Management"
    ],
    languages: [
        "Azerbaijani (Native)",
        "English (Intermediate)",
        "Turkish (Fluent)",
        "Spanish (Basic)"
    ],
    profile: "Təhlükəsizlik sistemlərinin qurulması və İT infrastrukturunun idarə edilməsi sahəsində təcrübəli mütəxəssisəm. Windows və Linux sistemləri, şəbəkə təhlükəsizliyi və məlumatların qorunması sahələrində bacarıqlarım var. Bundan əlavə, həm backend, həm də frontend veb proqramlaşdırma biliklərim var. Sıfırdan vebsaytlar yaratmaq, proqramlar yazmaq və PC və ya mobil oyunlar inkişaf etdirmək təcrübəm var.",
    experience: [
        {
            title: "Freelance Web Designer",
            period: "2023 – Present",
            company: "Remote",
            description: [
                "Designed and developed responsive websites using HTML, CSS, and JavaScript.",
                "Collaborated with clients to understand UI/UX needs and present optimized solutions.",
                "Integrated SEO best practices and ensured cross-browser compatibility."
            ]
        },
        {
            title: "Founder & Lead Game Developer",
            period: "2026 - Present",
            company: "Rey Studio",
            companyLink: "https://www.reystudio.dev",
            description: [
                "Founded Rey Studio to develop creative and immersive gaming experiences for PC and mobile platforms.",
                "Designed and programmed game mechanics, character systems, and level designs using Unity and C#.",
                "Led a small team of artists and programmers, managed development cycles, and oversaw publishing processes."
            ]
        },
        {
            title: "Cybersecurity Specialist",
            period: "2025 - 2027",
            company: "SkyTech",
            companyLink: "https://www.skytech.ru",
            description: [
                "Assisted in monitoring network activity and detecting potential threats.",
                "Learned the basics of penetration testing and participated in internal audits.",
                "Worked with open-source OSINT tools to collect and analyze public information."
            ]
        }
    ],
    references: [
        {
            name: "Elvin Qasımov",
            position: "SkyTech / Information Security Manager",
            phone: "+994 50 312 45 76",
            email: "elvin.qasimov@skytech.com"
        },
        {
            name: "Leyla Məmmədova",
            position: "Rey Studio / Game Artist",
            phone: "+994 55 798 56 34",
            email: "leyla.m@reystudio.dev"
        }
    ]
};

const DataManager = {
    init() {
        this.renderData();
        this.setupEditButtons();
    },

    renderData() {

        document.querySelector('.name-title').textContent = CV_DATA.personalInfo.name;
        document.querySelector('.job-title').textContent = CV_DATA.personalInfo.jobTitle;
        document.querySelector('.profile-img').src = CV_DATA.personalInfo.profileImage;

        const contactContent = document.getElementById('contact-content');
        contactContent.innerHTML = `
            <p><a href="https://wa.me/${CV_DATA.contact.phone.replace(/\D/g, '')}" target="_blank">📞 ${CV_DATA.contact.phone}</a></p>
            <p><a href="javascript:void(0)" onclick="sendEmail('${CV_DATA.contact.email}')">✉️ ${CV_DATA.contact.email}</a></p>
            <p>📍 ${CV_DATA.contact.address}</p>
            <p><a href="https://${CV_DATA.contact.website}" target="_blank">🌐 ${CV_DATA.contact.website}</a></p>
        `;

        const educationContent = document.getElementById('education-content');
        educationContent.innerHTML = CV_DATA.education.map(edu => `
            <div class="education-item">
                <a href="${edu.link}" target="_blank"><h3>${edu.school}</h3></a>
                <p>${edu.period}</p>
                <p>${edu.degree}</p>
                <p>GPA: ${edu.gpa}</p>
            </div>
        `).join('');

        const skillsContent = document.getElementById('skills-content');
        skillsContent.innerHTML = `
            <ul class="skills-list">
                ${CV_DATA.skills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
        `;

        const languagesContent = document.getElementById('languages-content');
        languagesContent.innerHTML = `
            <ul class="languages-list">
                ${CV_DATA.languages.map(lang => `<li>${lang}</li>`).join('')}
            </ul>
        `;

        document.querySelector('.profile p').textContent = CV_DATA.profile;

        const experienceContent = document.getElementById('experience-content');
        experienceContent.innerHTML = CV_DATA.experience.map(exp => `
            <div class="work-item">
                <h3 class="work-title">${exp.title}</h3>
                <p class="work-date">${exp.period}</p>
                <h4 class="work-subtitle">${exp.companyLink ? `<a href="${exp.companyLink}" target="_blank">${exp.company}</a>` : exp.company}</h4>
                <ul class="work-description">
                    ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
                </ul>
            </div>
        `).join('');


        const referencesContent = document.getElementById('references-content');
        referencesContent.innerHTML = `
            <div class="reference-grid">
                ${CV_DATA.references.map(ref => `
                    <div class="reference-item">
                        <h3>${ref.name}</h3>
                        <p>${ref.position}</p>
                        <p><a href="javascript:void(0)" onclick="openWhatsApp('${ref.phone.replace(/\D/g, '')}')">📞 ${ref.phone}</a></p>
                        <p><a href="javascript:void(0)" onclick="sendEmail('${ref.email}')">✉️ ${ref.email}</a></p>
                    </div>
                `).join('')}
            </div>
        `;
    },

    setupEditButtons() {

        const existingButtons = document.querySelectorAll('.edit-button');
        existingButtons.forEach(button => button.remove());

        const sections = ['contact', 'education', 'skills', 'languages', 'profile', 'experience', 'references'];
        sections.forEach(section => {
            const header = document.querySelector(`#${section}-content`).previousElementSibling;
            const editButton = document.createElement('button');
            editButton.className = 'edit-button';
            editButton.innerHTML = '✏️';
            editButton.onclick = () => this.openEditModal(section);
            header.appendChild(editButton);
        });
    },

    openEditModal(section) {
        const modal = document.createElement('div');
        modal.className = 'edit-modal';
        const currentLang = LanguageManager.currentLanguage;
        const translations = CONFIG.translations[currentLang];
        const sectionTitle = translations[section] || section;
        const editText = translations.edit;
        
        modal.innerHTML = `
            <div class="edit-modal-content">
                <h2>${currentLang === 'az' ? sectionTitle + ' ' + editText : sectionTitle + ' ' + editText}</h2>
                <div class="edit-form" id="edit-${section}"></div>
                <div class="modal-buttons">
                    <button onclick="DataManager.saveChanges('${section}')">${translations.save}</button>
                    <button onclick="DataManager.closeModal()">${translations.cancel}</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        this.populateEditForm(section);
    },

    populateEditForm(section) {
        const form = document.getElementById(`edit-${section}`);
        const currentLang = LanguageManager.currentLanguage;
        const translations = CONFIG.translations[currentLang];

        switch(section) {
            case 'contact':
                form.innerHTML = `
                    <input type="text" value="${CV_DATA.contact.phone}" placeholder="${translations.phone}">
                    <input type="email" value="${CV_DATA.contact.email}" placeholder="${translations.email}">
                    <input type="text" value="${CV_DATA.contact.address}" placeholder="${translations.address}">
                    <input type="text" value="${CV_DATA.contact.website}" placeholder="${translations.website}">
                `;
                break;
            case 'education':
                form.innerHTML = CV_DATA.education.map((edu, index) => `
                    <div class="education-edit">
                        <input type="text" value="${edu.school}" placeholder="${translations.school}">
                        <input type="text" value="${edu.period}" placeholder="${translations.period}">
                        <input type="text" value="${edu.degree}" placeholder="${translations.degree}">
                        <input type="text" value="${edu.gpa}" placeholder="${translations.gpa}">
                        <input type="text" value="${edu.link}" placeholder="${translations.link}">
                        <button onclick="DataManager.removeEducation(${index})">${translations.remove}</button>
                    </div>
                `).join('') + `<button onclick="DataManager.addEducation()">${currentLang === 'az' ? translations.education + ' ' + translations.add : translations.add + ' ' + translations.education.toLowerCase()}</button>`;
                break;
            case 'skills':
                form.innerHTML = `
                    <div class="skills-edit">
                        ${CV_DATA.skills.map((skill, index) => `
                            <div class="skill-item">
                                <input type="text" value="${skill}" placeholder="${translations.skill}">
                                <button onclick="DataManager.removeSkill(${index})">${translations.remove}</button>
                            </div>
                        `).join('')}
                        <button onclick="DataManager.addSkill()">${currentLang === 'az' ? translations.skill + ' ' + translations.add : translations.add + ' ' + translations.skill.toLowerCase()}</button>
                    </div>
                `;
                break;
            case 'languages':
                form.innerHTML = `
                    <div class="languages-edit">
                        ${CV_DATA.languages.map((lang, index) => `
                            <div class="language-item">
                                <input type="text" value="${lang}" placeholder="${translations.language}">
                                <button onclick="DataManager.removeLanguage(${index})">${translations.remove}</button>
                            </div>
                        `).join('')}
                        <button onclick="DataManager.addLanguage()">${currentLang === 'az' ? translations.language + ' ' + translations.add : translations.add + ' ' + translations.language.toLowerCase()}</button>
                    </div>
                `;
                break;
            case 'profile':
                form.innerHTML = `
                    <textarea class="profile-edit" placeholder="${translations.profile}">${CV_DATA.profile}</textarea>
                `;
                break;
            case 'experience':
                form.innerHTML = CV_DATA.experience.map((exp, index) => `
                    <div class="experience-edit">
                        <input type="text" value="${exp.title}" placeholder="${translations.title}">
                        <input type="text" value="${exp.period}" placeholder="${translations.period}">
                        <input type="text" value="${exp.company}" placeholder="${translations.company}">
                        <input type="text" value="${exp.companyLink || ''}" placeholder="${translations.companyLink}">
                        <div class="description-edit">
                            ${exp.description.map((desc, descIndex) => `
                                <div class="description-item">
                                    <input type="text" value="${desc}" placeholder="${translations.description}">
                                    <button onclick="DataManager.removeDescription(${index}, ${descIndex})">${translations.remove}</button>
                                </div>
                            `).join('')}
                            <button onclick="DataManager.addDescription(${index})">${currentLang === 'az' ? translations.description + ' ' + translations.add : translations.add + ' ' + translations.description.toLowerCase()}</button>
                        </div>
                        <button onclick="DataManager.removeExperience(${index})">${currentLang === 'az' ? translations.experience + ' ' + translations.remove : translations.remove + ' ' + translations.experience.toLowerCase()}</button>
                    </div>
                `).join('') + `<button onclick="DataManager.addExperience()">${currentLang === 'az' ? translations.experience + ' ' + translations.add : translations.add + ' ' + translations.experience.toLowerCase()}</button>`;
                break;
            case 'references':
                form.innerHTML = CV_DATA.references.map((ref, index) => `
                    <div class="reference-edit">
                        <input type="text" value="${ref.name}" placeholder="${translations.name}">
                        <input type="text" value="${ref.position}" placeholder="${translations.position}">
                        <input type="text" value="${ref.phone}" placeholder="${translations.phone}">
                        <input type="email" value="${ref.email}" placeholder="${translations.email}">
                        <button onclick="DataManager.removeReference(${index})">${translations.remove}</button>
                    </div>
                `).join('') + `<button onclick="DataManager.addReference()">${currentLang === 'az' ? translations.references + ' ' + translations.add : translations.add + ' ' + translations.references.toLowerCase()}</button>`;
                break;
        }

        const modalButtons = document.querySelector('.modal-buttons');
        if (modalButtons) {
            modalButtons.innerHTML = `
                <button onclick="DataManager.saveChanges('${section}')">${translations.save}</button>
                <button onclick="DataManager.closeModal()">${translations.cancel}</button>
            `;
        }
    },

    saveChanges(section) {
        const form = document.getElementById(`edit-${section}`);
        switch(section) {
            case 'contact':
                CV_DATA.contact = {
                    phone: form.querySelector('input:nth-child(1)').value,
                    email: form.querySelector('input:nth-child(2)').value,
                    address: form.querySelector('input:nth-child(3)').value,
                    website: form.querySelector('input:nth-child(4)').value
                };
                break;
            case 'education':
                CV_DATA.education = Array.from(form.querySelectorAll('.education-edit')).map(edu => ({
                    school: edu.querySelector('input:nth-child(1)').value,
                    period: edu.querySelector('input:nth-child(2)').value,
                    degree: edu.querySelector('input:nth-child(3)').value,
                    gpa: edu.querySelector('input:nth-child(4)').value,
                    link: edu.querySelector('input:nth-child(5)').value
                }));
                break;
            case 'skills':
                CV_DATA.skills = Array.from(form.querySelectorAll('.skill-item input')).map(input => input.value);
                break;
            case 'languages':
                CV_DATA.languages = Array.from(form.querySelectorAll('.language-item input')).map(input => input.value);
                break;
            case 'profile':
                CV_DATA.profile = form.querySelector('.profile-edit').value;
                break;
            case 'experience':
                CV_DATA.experience = Array.from(form.querySelectorAll('.experience-edit')).map(exp => ({
                    title: exp.querySelector('input:nth-child(1)').value,
                    period: exp.querySelector('input:nth-child(2)').value,
                    company: exp.querySelector('input:nth-child(3)').value,
                    companyLink: exp.querySelector('input:nth-child(4)').value,
                    description: Array.from(exp.querySelectorAll('.description-item input')).map(input => input.value)
                }));
                break;
            case 'references':
                CV_DATA.references = Array.from(form.querySelectorAll('.reference-edit')).map(ref => ({
                    name: ref.querySelector('input:nth-child(1)').value,
                    position: ref.querySelector('input:nth-child(2)').value,
                    phone: ref.querySelector('input:nth-child(3)').value,
                    email: ref.querySelector('input:nth-child(4)').value
                }));
                break;
        }
        this.renderData();
        this.closeModal();
    },

    closeModal() {
        const modal = document.querySelector('.edit-modal');
        if (modal) {
            modal.remove();
        }
    },

    addEducation() {
        CV_DATA.education.push({
            school: "",
            period: "",
            degree: "",
            gpa: "",
            link: ""
        });
        this.populateEditForm('education');
    },

    removeEducation(index) {
        CV_DATA.education.splice(index, 1);
        this.populateEditForm('education');
    },

    addSkill() {
        CV_DATA.skills.push("");
        this.populateEditForm('skills');
    },

    removeSkill(index) {
        CV_DATA.skills.splice(index, 1);
        this.populateEditForm('skills');
    },

    addLanguage() {
        CV_DATA.languages.push("");
        this.populateEditForm('languages');
    },

    removeLanguage(index) {
        CV_DATA.languages.splice(index, 1);
        this.populateEditForm('languages');
    },

    addExperience() {
        CV_DATA.experience.push({
            title: "",
            period: "",
            company: "",
            companyLink: "",
            description: [""]
        });
        this.populateEditForm('experience');
    },

    removeExperience(index) {
        CV_DATA.experience.splice(index, 1);
        this.populateEditForm('experience');
    },

    addDescription(expIndex) {
        CV_DATA.experience[expIndex].description.push("");
        this.populateEditForm('experience');
    },

    removeDescription(expIndex, descIndex) {
        CV_DATA.experience[expIndex].description.splice(descIndex, 1);
        this.populateEditForm('experience');
    },

    addReference() {
        CV_DATA.references.push({
            name: "",
            position: "",
            phone: "",
            email: ""
        });
        this.populateEditForm('references');
    },

    removeReference(index) {
        CV_DATA.references.splice(index, 1);
        this.populateEditForm('references');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    AnimationManager.init();
    LanguageManager.init();
    PDFManager.init();
    ContactFormManager.init();
    ThemeManager.init();
    DataManager.init();
});

function openWhatsApp(number) {
    window.open(`https://wa.me/${number}`, '_blank');
}

function sendEmail(email) {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=CV%20Haqqında&body=`, '_blank');
}

console.log('main.js yüklendi');

function toggleAccordion(id) {
    const content = document.getElementById(id);
    const header = content.previousElementSibling;
    
    content.classList.toggle('active');
    header.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function() {
    const sections = [
        'contact-content',
        'education-content',
        'skills-content',
        'languages-content',
        'profile-content',
        'experience-content',
        'references-content'
    ];

    sections.forEach(sectionId => {
        const content = document.getElementById(sectionId);
        const header = content.previousElementSibling;
        
        content.classList.remove('active');
        header.classList.remove('active');
    });
}); 
