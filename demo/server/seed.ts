import bcrypt from 'bcrypt';
import { connectDB } from './db';
import { AdminModel, CampModel, VaccineModel, SchemeModel } from './models';

async function seed() {
  try {
    await connectDB();
    console.log('🌱 Starting database seed...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await AdminModel.deleteMany({});
    await AdminModel.create({
      email: 'admin@arogya.gov',
      password: hashedPassword,
      name: 'System Administrator'
    });
    console.log('✅ Created admin user (email: admin@arogya.gov, password: admin123)');

    // Create sample camps
    await CampModel.deleteMany({});
    await CampModel.create([
      {
        title: 'General Health Checkup Camp',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        time: '09:00 AM - 04:00 PM',
        location: 'Village Community Center, Main Street',
        type: 'General',
        description: 'Free general health checkup including blood pressure, sugar level, and basic health screening. All villagers are welcome.',
        status: 'upcoming'
      },
      {
        title: 'COVID-19 Vaccination Drive',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        time: '10:00 AM - 02:00 PM',
        location: 'Primary Health Center',
        type: 'Vaccination',
        description: 'COVID-19 vaccination for all eligible individuals. Bring your Aadhaar card and previous vaccination certificate if applicable.',
        status: 'active'
      },
      {
        title: 'Eye Care Specialty Camp',
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        time: '08:00 AM - 12:00 PM',
        location: 'District Hospital Outreach Center',
        type: 'Specialty',
        description: 'Free eye screening and cataract detection. Specialists from city hospital will be available. Free spectacles for eligible patients.',
        status: 'upcoming'
      }
    ]);
    console.log('✅ Created 3 sample health camps');

    // Create sample vaccines
    await VaccineModel.deleteMany({});
    await VaccineModel.create([
      {
        name: 'BCG (Tuberculosis)',
        ageGroup: 'At birth',
        scheduleNotes: 'Single dose at birth or as early as possible until one year of age',
        nextDoseInfo: 'No booster dose required'
      },
      {
        name: 'Hepatitis B (Birth Dose)',
        ageGroup: 'At birth',
        scheduleNotes: 'Given within 24 hours of birth',
        nextDoseInfo: 'Follow-up doses at 6 weeks, 10 weeks, and 14 weeks'
      },
      {
        name: 'OPV (Polio)',
        ageGroup: '6 weeks, 10 weeks, 14 weeks',
        scheduleNotes: 'Three primary doses at 6, 10, and 14 weeks of age',
        nextDoseInfo: 'Booster doses at 16-24 months and 5 years'
      },
      {
        name: 'DPT (Diphtheria, Pertussis, Tetanus)',
        ageGroup: '6 weeks, 10 weeks, 14 weeks',
        scheduleNotes: 'Three primary doses at 6, 10, and 14 weeks',
        nextDoseInfo: 'Booster doses at 16-24 months and 5-6 years'
      },
      {
        name: 'Measles-Rubella (MR)',
        ageGroup: '9-12 months',
        scheduleNotes: 'First dose at 9-12 months',
        nextDoseInfo: 'Second dose at 16-24 months'
      }
    ]);
    console.log('✅ Created 5 vaccination schedules');

    // Create sample schemes
    await SchemeModel.deleteMany({});
    await SchemeModel.create([
      {
        name: 'Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
        eligibility: 'Families identified in SECC 2011 database. Covers over 10.74 crore poor and vulnerable families.',
        benefits: 'Health cover of Rs. 5 lakh per family per year for secondary and tertiary care hospitalization. Cashless treatment at empanelled hospitals.',
        description: 'World\'s largest health assurance scheme aimed at providing financial protection for healthcare to poor and vulnerable families.'
      },
      {
        name: 'Janani Suraksha Yojana (JSY)',
        eligibility: 'All pregnant women delivering in government health facilities or accredited private institutions',
        benefits: 'Cash assistance to pregnant women: Rs. 1400 for rural areas and Rs. 1000 for urban areas. Free delivery services and postnatal care.',
        description: 'Safe motherhood intervention to reduce maternal and neonatal mortality by promoting institutional delivery.'
      },
      {
        name: 'National Health Mission (NHM)',
        eligibility: 'All citizens, with focus on rural population, women, and children',
        benefits: 'Free essential drugs, diagnostics, emergency care, and improved healthcare infrastructure. Free ambulance services (108).',
        description: 'Comprehensive primary healthcare program providing accessible, affordable, and quality health services to rural population.'
      },
      {
        name: 'Rashtriya Bal Swasthya Karyakram (RBSK)',
        eligibility: 'All children from birth to 18 years',
        benefits: 'Free screening and early detection of birth defects, diseases, deficiencies, and developmental delays. Free treatment and follow-up.',
        description: 'Child health screening and early intervention services for 4 Ds: Defects at birth, Deficiencies, Diseases, Development delays.'
      }
    ]);
    console.log('✅ Created 4 government health schemes');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Admin Credentials:');
    console.log('   Email: admin@arogya.gov');
    console.log('   Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seed();
