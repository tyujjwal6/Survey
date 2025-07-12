import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Users, UserCheck, UserCog, UserX } from 'lucide-react';

// ===================================================================================
// DUMMY API HANDLER
// ===================================================================================
const handleApiSubmission = async (chartTitle, data) => {
  console.log(`[API SIMULATION] Submitting data for: ${chartTitle}`);
  console.log("[API SIMULATION] Data:", data);
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`[API SIMULATION] Submission for ${chartTitle} complete.`);
};


// ===================================================================================
// MOCK DATA (no changes here)
// ===================================================================================
const totalRecordsData = { survey: 10025, qc: 2, zc: 4, ot: 257 };
const ageData = [
  { name: 'Above 60', value: 1179, label: '৬০ ৰ ওপৰত' },
  { name: '46-60', value: 2175, label: '৪৬-৬০' },
  { name: '36-45', value: 2718, label: '৩৬-৪৫' },
  { name: '24-35', value: 3086, label: '২৪-৩৫' },
  { name: '18-23', value: 871, label: '১৮-২৩' },
];
const AGE_COLORS = ['#d862a0', '#775dd0', '#39a7b3', '#4fb26a', '#a4c24a'];
const genderData = [
    { name: 'Male', value: 4446, label: 'পুৰুষ' },
    { name: 'Female', value: 5576, label: 'মহিলা' },
    { name: 'Other', value: 7, label: 'অন্যান্য' },
];
const GENDER_COLORS = ['#e54d4c', '#4683e9', '#32c1c9'];
const educationData = [
  { name: 'Literate', value: 2698, label: 'অশিক্ষিত' },
  { name: 'Primary', value: 3933, label: 'প্ৰাথমিক' },
  { name: 'High School Pass', value: 1783, label: 'হাইস্কুল উত্তীৰ্ণ' },
  { name: '12th Pass', value: 1033, label: 'দ্বাদশ উত্তীৰ্ণ' },
  { name: 'Graduate', value: 538, label: 'স্নাতক' },
  { name: 'Postgraduate', value: 44, label: 'স্নাতকোত্তৰ' },
];
const EDUCATION_COLORS = ['#e54d4c', '#537de2', '#49b55f', '#f29949', '#775dd0', '#32c1c9'];
const economicStatusData = [
    { name: 'Middle Class', value: 6380, label: 'মধ্যবিত্ত' },
    { name: 'Poor', value: 2794, label: 'দুখীয়া' },
    { name: 'Very Poor', value: 204, label: 'অতি দুখীয়া' },
    { name: 'Rich', value: 141, label: 'ধনী' },
];
const ECONOMIC_STATUS_COLORS = ['#e54d4c', '#49b55f', '#32c1c9', '#4683e9'];
const occupationData = [
  { name: 'Housewife', value: 4158, label: 'গৃহিণী' },
  { name: 'Student (Male)', value: 184, label: 'ছাত্র' },
  { name: 'Student (Female)', value: 279, label: 'ছাত্রী' },
  { name: 'Farmer', value: 1208, label: 'কৃষক' },
  { name: 'Retired', value: 29, label: 'অৱসৰপ্ৰাপ্ত' },
  { name: 'Small Business', value: 495, label: 'সৰু ব্যৱসায়' },
  { name: 'Private Job', value: 184, label: 'ব্যক্তিগত চাকৰি' },
  { name: 'Government Job', value: 168, label: 'চৰকাৰী চাকৰি' },
  { name: 'Big Business', value: 17, label: 'ডাঙৰ ব্যৱসায়' },
  { name: 'Small-scale Industry', value: 22, label: 'সৰু উদ্যোগ' },
  { name: 'Other', value: 280, label: 'অন্যান্য' },
  { name: 'Unemployed', value: 782, label: 'বেকাৰ' },
  { name: 'Unskilled Labor', value: 2071, label: 'অদক্ষ শ্ৰমিক' },
  { name: 'Industrial Labor', value: 166, label: 'ঔদ্যোগিক শ্ৰমিক' },
];
const OCCUPATION_COLORS = ['#775dd0', '#537de2', '#e54d4c', '#49b55f', '#f29949', '#32c1c9', '#d862a0', '#4683e9', '#a4c24a', '#f97c7c', '#6c8cd5', '#ffbb44', '#cc66cc', '#78c2c3'];
const incomeSourceData = [
    { name: 'Daily Wage', value: 3314, label: 'মজুৰী' },
    { name: 'Own Small Work', value: 460, label: 'নিজৰ সৰু কাম' },
    { name: 'Agriculture', value: 1841, label: 'কৃষি' },
    { name: 'Work in Other State', value: 56, label: 'অন্য ৰাজ্যত কাম' },
    { name: 'Government Job', value: 238, label: 'চৰকাৰী চাকৰি' },
    { name: 'Pension', value: 88, label: 'পেন্সন' },
    { name: 'Own Business', value: 355, label: 'নিজৰ ব্যৱসায়' },
    { name: 'Other', value: 1095, label: 'অন্য' },
    { name: 'No Source', value: 2300, label: 'কোনো উৎস নাই' },
];
const INCOME_SOURCE_COLORS = ['#e54d4c', '#537de2', '#49b55f', '#f29949', '#775dd0', '#32c1c9', '#d862a0', '#ffbb44', '#4683e9'];
const familyProblemsData = [
  { name: 'Lack of Two Meals a Day', value: 874, label: 'এসাঁজ খাবলৈ নোহোৱা' },
  { name: 'Family Safety', value: 243, label: 'পৰিয়ালৰ সুৰক্ষা' },
  { name: 'Inflation', value: 923, label: 'মূল্যবৃদ্ধি' },
  { name: 'Drinking Water', value: 1654, label: 'খোৱা পানী' },
  { name: 'Education System', value: 4652, label: 'শিক্ষা ব্যৱস্থা' },
  { name: 'Low Prices for Crops', value: 4423, label: 'শস্যৰ কম দাম' },
  { name: 'Lack of Area Development', value: 1543, label: 'অঞ্চলটোৰ উন্নয়নৰ অভাৱ' },
];
const politicalInterestData = [
    { name: 'A Little', value: 6380, label: 'অলপ' },
    { name: 'Very much', value: 113, label: 'বহুত বেছি' },
    { name: 'More', value: 372, label: 'অধিক' },
    { name: 'Not at all', value: 822, label: 'একেবাৰে নহয়' },
    { name: 'Can\'t say', value: 561, label: 'ক\'ব নোৱাৰো' },
    { name: 'Very Little', value: 202, label: 'খুব কম' },
    { name: 'Less', value: 1580, label: 'কম' },
];
const POLITICAL_INTEREST_COLORS = ['#4683e9', '#e54d4c', '#49b55f', '#775dd0', '#f29949', '#32c1c9', '#d862a0'];
const mlaSatisfactionData = [
    { name: 'Satisfied', value: 4734, label: 'সন্তুষ্ট' },
    { name: 'Very satisfied', value: 1574, label: 'বহুত সন্তুষ্ট' },
    { name: 'Little Happy', value: 2892, label: 'অলপ সুখী' },
    { name: 'Dissatisfied', value: 259, label: 'অসন্তুষ্ট' },
    { name: 'Very dissatisfied', value: 72, label: 'বহুত অসন্তুষ্ট' },
    { name: 'Can\'t say', value: 398, label: 'ক\'ব নোৱাৰো' },
];
const MLA_SATISFACTION_COLORS = ['#4683e9', '#e54d4c', '#49b55f', '#775dd0', '#f29949', '#32c1c9'];
const mlaReelectionData = [
    { name: 'Yes', value: 5050, label: 'হয়' },
    { name: 'No', value: 2927, label: 'নহয়' },
    { name: 'Can\'t say', value: 2052, label: 'ক\'ব নোৱাৰো' },
];
const MLA_REELECTION_COLORS = ['#4683e9', '#e54d4c', '#49b55f'];
const stateGovSatisfactionData = [
    { name: 'Satisfied', value: 5439, label: 'সন্তুষ্ট' },
    { name: 'Very satisfied', value: 1535, label: 'বহুত সন্তুষ্ট' },
    { name: 'Little Happy', value: 2632, label: 'অলপ সুখী' },
    { name: 'Dissatisfied', value: 204, label: 'অসন্তুষ্ট' },
    { name: 'Very dissatisfied', value: 25, label: 'বহুত অসন্তুষ্ট' },
    { name: 'Can\'t say', value: 194, label: 'ক\'ব নোৱাৰো' },
];
const STATE_GOV_SATISFACTION_COLORS = ['#4683e9', '#e54d4c', '#49b55f', '#775dd0', '#f29949', '#32c1c9'];
const cmWorkSatisfactionData = [
    { name: 'Satisfied', value: 5792, label: 'সন্তুষ্ট' },
    { name: 'Very satisfied', value: 1519, label: 'বহুত সন্তুষ্ট' },
    { name: 'Little Happy', value: 2300, label: 'অলপ সুখী' },
    { name: 'Dissatisfied', value: 196, label: 'অসন্তুষ্ট' },
    { name: 'Very dissatisfied', value: 41, label: 'বহুত অসন্তুষ্ট' },
    { name: 'Can\'t say', value: 180, label: 'ক\'ব নোৱাৰো' },
];
const CM_WORK_SATISFACTION_COLORS = ['#4683e9', '#e54d4c', '#49b55f', '#775dd0', '#f29949', '#32c1c9'];
const nextCMChoiceData = [
    { name: 'Himanta Biswa Sarma', value: 8546, label: 'হিমন্ত বিশ্ব শৰ্মা' },
    { name: 'Gaurav Gogoi', value: 251, label: 'গৌৰৱ গগৈ' },
    { name: 'Sarbananda Sonowal', value: 522, label: 'সৰ্বানন্দ সোণোৱাল' },
    { name: 'Other', value: 710, label: 'অন্য' },
];
const NEXT_CM_CHOICE_COLORS = ['#4683e9', '#e54d4c', '#49b55f', '#32c1c9'];

// ===================================================================================
// REUSABLE UI COMPONENTS
// ===================================================================================
const Card = ({ children, className }) => (<div className={`bg-white border border-gray-200 rounded-lg shadow-sm p-3 sm:p-4 ${className}`}>{children}</div>);
const CardHeader = ({ children }) => <div className="mb-4">{children}</div>;
const CardTitle = ({ children }) => <h3 className="text-base sm:text-lg font-semibold text-gray-800">{children}</h3>;
const CardContent = ({ children, className }) => <div className={`relative ${className}`}>{children}</div>;
const CanvasJSWatermark = () => <span className="absolute bottom-2 left-2 text-gray-400 text-xs font-light">CanvasJS Trial</span>;
const StatCard = ({ icon: Icon, title, value, colorClass }) => (
  <Card className="flex items-center p-4">
    <div className={`p-3 rounded-full ${colorClass} mr-4`}><Icon className="h-6 w-6 text-white" /></div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value.toLocaleString()}</p>
    </div>
  </Card>
);

// ===================================================================================
// REUSABLE CHART COMPONENTS
// ===================================================================================

// Reusable Pie Chart Component
const GenericPieChart = ({ title, data, colors }) => {
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, payload }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="#333" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-[10px] sm:text-xs">
        {`${payload.label} - ${payload.value.toLocaleString()}`}
      </text>
    );
  };
  
  const CustomLegend = ({ payload }) => (
    <div className="w-full mt-4 text-xs">
      <ul className="flex flex-wrap justify-center gap-y-1 gap-x-2 sm:gap-x-4">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} className="flex items-center space-x-1.5">
            <span style={{ backgroundColor: entry.color }} className="w-2.5 h-2.5 inline-block rounded-full"></span>
            <span>{entry.payload.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent className="h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              formatter={(value, name, props) => {
                // FIX: Changed props.payload.payload.label to props.payload.label
                // Added a safety check to prevent errors if payload is missing.
                if (props && props.payload) {
                  return [`${value.toLocaleString()} (${(props.payload.percent * 100).toFixed(1)}%)`, props.payload.label];
                }
                return [value, name];
              }}
              contentStyle={{ background: 'white', border: '1px solid #ccc', borderRadius: '5px' }}
            />
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              labelLine={true}
              label={renderCustomizedLabel}
              outerRadius="60%"
              fill="#8884d8"
              dataKey="value"
              // FIX: The onClick event passes the data object directly.
              onClick={(payload) => handleApiSubmission(title, payload)}
            >
              {data.map((entry, index) => (<Cell key={`cell-${index}`} fill={colors[index % colors.length]} />))}
            </Pie>
            <Legend content={<CustomLegend />} verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
        <CanvasJSWatermark />
      </CardContent>
    </Card>
  );
};

// Reusable Bar Chart Component
const GenericBarChart = ({ title, data, colors }) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent className="h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 90 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="label" interval={0} angle={-35} textAnchor="end" height={100} tick={{ fontSize: 10 }} />
            <YAxis label={{ value: 'Countings', angle: -90, position: 'insideLeft', offset: 10, style: { textAnchor: 'middle' } }} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => [value.toLocaleString(), 'Count']} contentStyle={{ background: 'white', border: '1px solid #ccc', borderRadius: '5px' }} />
            <Legend formatter={(value) => <span className="text-gray-700">{value}</span>} payload={[{ value: 'Counting', type: 'square', id: 'ID01', color: '#1f77b4' }]} verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }}/>
            <Bar dataKey="value">
              {data.map((entry, index) => (<Cell key={`cell-${index}`} fill={colors[index % colors.length]} />))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <CanvasJSWatermark />
      </CardContent>
    </Card>
  );
};

// ===================================================================================
// MAIN DASHBOARD COMPONENT
// ===================================================================================
const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-2 sm:p-4 lg:p-6 font-sans">
      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          <StatCard icon={Users} title="Total Survey Records" value={totalRecordsData.survey} colorClass="bg-blue-500" />
          <StatCard icon={UserCheck} title="Total QC Records" value={totalRecordsData.qc} colorClass="bg-orange-500" />
          <StatCard icon={UserCog} title="Total ZC Records" value={totalRecordsData.zc} colorClass="bg-teal-500" />
          <StatCard icon={UserX} title="Total OT Records" value={totalRecordsData.ot} colorClass="bg-pink-500" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <GenericPieChart title="বয়স / Age" data={ageData} colors={AGE_COLORS} />
          <GenericPieChart title="লিঙ্গ / Gender" data={genderData} colors={GENDER_COLORS} />
          <GenericPieChart title="শিক্ষা / Education" data={educationData} colors={EDUCATION_COLORS} />
          <GenericPieChart title="আপোনাৰ পৰিয়ালৰ অৰ্থনৈতিক অৱস্থা / Economic Status of Your Family" data={economicStatusData} colors={ECONOMIC_STATUS_COLORS} />
          <GenericPieChart title="ব্যৱসায় / Occupation" data={occupationData} colors={OCCUPATION_COLORS} />
          <GenericPieChart title="উপাৰ্জনৰ প্ৰধান উৎস / Main Source of Income for Your Family" data={incomeSourceData} colors={INCOME_SOURCE_COLORS} />
          <GenericBarChart title="আপোনাৰ পৰিয়াল কিহত সমস্যা ভুগি আছে? / What problems is your family facing? (Multiple answers allowed)" data={familyProblemsData} colors={['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2']} />
          <GenericPieChart title="আপুনি ৰাজনীতিত আৰু ৰাজনৈতিক বিষয়ত কিমান আগ্ৰহী? / How interested are you in politics and political matters?" data={politicalInterestData} colors={POLITICAL_INTEREST_COLORS} />
          <GenericPieChart title="আপুনি নিজৰ বিধায়কৰ কামত কিমান সন্তুষ্ট? / How satisfied are you with the work of your MLA?" data={mlaSatisfactionData} colors={MLA_SATISFACTION_COLORS} />
          <GenericPieChart title="কম কামৰ পাছতো আপুনি নিজৰ বিধায়কক পুনৰ নিৰ্বাচন কৰিব বিচাৰেনে? / Despite less work, would you like to re-elect your MLA?" data={mlaReelectionData} colors={MLA_REELECTION_COLORS} />
          <GenericPieChart title="আপুনি ৰাজ্য চৰকাৰৰ কামত কিমান সন্তুষ্ট? / How satisfied are you with the functioning of the state government?" data={stateGovSatisfactionData} colors={STATE_GOV_SATISFACTION_COLORS} />
          <GenericPieChart title="আপুনি অসমৰ মুখ্যমন্ত্ৰী হিমন্ত বিশ্ব শৰ্মাৰ কামত কিমান সন্তুষ্ট? / How satisfied are you with the work of Assam CM Himanta Biswa Sarma?" data={cmWorkSatisfactionData} colors={CM_WORK_SATISFACTION_COLORS} />
          <GenericPieChart title="আপুনি অসমৰ পৰৱৰ্তী মুখ্যমন্ত্ৰী হিচাপে কাক বিচাৰে? / Whom would you like to see as the next Chief Minister of Assam?" data={nextCMChoiceData} colors={NEXT_CM_CHOICE_COLORS} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;