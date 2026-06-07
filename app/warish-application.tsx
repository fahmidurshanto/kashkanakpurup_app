import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

// ─── Reusable Components ───────────────────────────────────────────
function LabeledInput({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  flex = 1,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'numeric' | 'phone-pad';
  flex?: number;
}) {
  return (
    <View style={[styles.fieldContainer, { flex }]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
}

function FieldRow({ children }: { children: React.ReactNode }) {
  return <View style={styles.fieldRow}>{children}</View>;
}

// ─── Heir Interface ────────────────────────────────────────────────
interface Heir {
  nameBn: string;
  nameEn: string;
  nid: string;
  relationship: string;
  age: string;
  serial: string;
}

const createEmptyHeir = (): Heir => ({
  nameBn: '',
  nameEn: '',
  nid: '',
  relationship: '',
  age: '',
  serial: '',
});

const WARD_OPTIONS = ['১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

// ─── Main Component ────────────────────────────────────────────────
export default function WarishApplicationScreen() {
  const router = useRouter();

  // Form fields
  const [deceasedNameBn, setDeceasedNameBn] = useState('');
  const [deceasedNameEn, setDeceasedNameEn] = useState('');
  const [fatherBn, setFatherBn] = useState('');
  const [fatherEn, setFatherEn] = useState('');
  const [motherBn, setMotherBn] = useState('');
  const [motherEn, setMotherEn] = useState('');
  const [villageBn, setVillageBn] = useState('');
  const [villageEn, setVillageEn] = useState('');
  const [postOfficeBn, setPostOfficeBn] = useState('');
  const [postOfficeEn, setPostOfficeEn] = useState('');
  const [deathDate, setDeathDate] = useState('');
  const [wardNo, setWardNo] = useState('');
  const [applicantBn, setApplicantBn] = useState('');
  const [applicantEn, setApplicantEn] = useState('');
  const [mobile, setMobile] = useState('');

  // Captcha
  const [captchaNum1] = useState(Math.floor(Math.random() * 9) + 1);
  const [captchaNum2] = useState(Math.floor(Math.random() * 9) + 1);
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  // Ward dropdown
  const [showWardPicker, setShowWardPicker] = useState(false);

  // Dynamic heirs list
  const [heirs, setHeirs] = useState<Heir[]>([createEmptyHeir()]);

  const addHeir = () => {
    setHeirs([...heirs, createEmptyHeir()]);
  };

  const removeHeir = (index: number) => {
    if (heirs.length <= 1) return;
    setHeirs(heirs.filter((_, i) => i !== index));
  };

  const updateHeir = (index: number, field: keyof Heir, value: string) => {
    const updated = [...heirs];
    updated[index] = { ...updated[index], [field]: value };
    setHeirs(updated);
  };

  const handleSubmit = () => {
    // Validate captcha
    if (parseInt(captchaAnswer, 10) !== captchaNum1 + captchaNum2) {
      Alert.alert('ত্রুটি', 'ক্যাপচা সঠিক নয়। অনুগ্রহ করে আবার চেষ্টা করুন।');
      return;
    }

    const formData: Record<string, string> = {
      'ওয়ারিশান ব্যাক্তির নাম (বাংলা)': deceasedNameBn,
      'ওয়ারিশান ব্যাক্তির নাম (English)': deceasedNameEn,
      'পিতা/স্বামী (বাংলা)': fatherBn,
      'পিতা/স্বামী (English)': fatherEn,
      'মাতা (বাংলা)': motherBn,
      'মাতা (English)': motherEn,
      'গ্রাম/রাস্তা/এলাকা (বাংলা)': villageBn,
      'গ্রাম/রাস্তা/এলাকা (English)': villageEn,
      'ডাকঘর (বাংলা)': postOfficeBn,
      'ডাকঘর (English)': postOfficeEn,
      'মৃত্যু তারিখ': deathDate,
      'ওয়ার্ড নং': wardNo,
      'আবেদন কর্তী (বাংলা)': applicantBn,
      'আবেদন কর্তী (English)': applicantEn,
      'মোবাইল': mobile,
    };

    // Add heirs info
    heirs.forEach((heir, i) => {
      formData[`ওয়ারিশ ${i + 1} নাম`] = heir.nameBn;
      formData[`ওয়ারিশ ${i + 1} নাম (En)`] = heir.nameEn;
      formData[`ওয়ারিশ ${i + 1} এনআইডি`] = heir.nid;
      formData[`ওয়ারিশ ${i + 1} সম্পর্ক`] = heir.relationship;
      formData[`ওয়ারিশ ${i + 1} বয়স`] = heir.age;
    });

    const message = Object.entries(formData)
      .map(([key, val]) => `${key}: ${val || '—'}`)
      .join('\n');

    Alert.alert('আবেদন তথ্য', message);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.contentContainer}>
      {/* Breadcrumb */}
      <View style={styles.breadcrumb}>
        <View style={styles.breadcrumbAccent} />
        <Text style={styles.breadcrumbText}>ই-সেবা » ওয়ারিশ সনদ</Text>
      </View>

      {/* ════════ Form Fields ════════ */}
      <FieldRow>
        <LabeledInput label="ওয়ারিশান ব্যাক্তির নাম" placeholder="ওয়ারিশান ব্যাক্তির নাম" value={deceasedNameBn} onChangeText={setDeceasedNameBn} />
        <LabeledInput label="ওয়ারিশান ব্যাক্তির নাম (English)" placeholder="ওয়ারিশান ব্যাক্তির নাম" value={deceasedNameEn} onChangeText={setDeceasedNameEn} />
      </FieldRow>

      <FieldRow>
        <LabeledInput label="পিতা/স্বামী" placeholder="পিতা/স্বামী" value={fatherBn} onChangeText={setFatherBn} />
        <LabeledInput label="পিতা/স্বামী (English)" placeholder="পিতা/স্বামী" value={fatherEn} onChangeText={setFatherEn} />
      </FieldRow>

      <FieldRow>
        <LabeledInput label="মাতা" placeholder="মাতা" value={motherBn} onChangeText={setMotherBn} />
        <LabeledInput label="মাতা (English)" placeholder="মাতা" value={motherEn} onChangeText={setMotherEn} />
      </FieldRow>

      <FieldRow>
        <LabeledInput label="গ্রাম/ রাস্তা /এলাকা" placeholder="গ্রাম/ রাস্তা" value={villageBn} onChangeText={setVillageBn} />
        <LabeledInput label="গ্রাম/ রাস্তা /এলাকা (English)" placeholder="গ্রাম/ রাস্তা" value={villageEn} onChangeText={setVillageEn} />
      </FieldRow>

      <FieldRow>
        <LabeledInput label="ডাকঘর" placeholder="ডাকঘর" value={postOfficeBn} onChangeText={setPostOfficeBn} />
        <LabeledInput label="ডাকঘর (English)" placeholder="ডাকঘর" value={postOfficeEn} onChangeText={setPostOfficeEn} />
      </FieldRow>

      <FieldRow>
        <LabeledInput label="মৃত্যু তারিখ" placeholder="মৃত্যু তারিখ" value={deathDate} onChangeText={setDeathDate} />
        <View style={[styles.fieldContainer, { flex: 1 }]}>
          <Text style={styles.fieldLabel}>ওয়ার্ড নং</Text>
          <TouchableOpacity
            style={styles.dropdownBtn}
            onPress={() => setShowWardPicker(!showWardPicker)}
          >
            <Text style={styles.dropdownBtnText}>{wardNo || 'ওয়ার্ড নং'}</Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
          {showWardPicker && (
            <View style={styles.dropdownList}>
              {WARD_OPTIONS.map((w) => (
                <TouchableOpacity
                  key={w}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setWardNo(w);
                    setShowWardPicker(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{w}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </FieldRow>

      <FieldRow>
        <LabeledInput label="আবেদন কর্তী" placeholder="আবেদন কর্তী" value={applicantBn} onChangeText={setApplicantBn} />
        <LabeledInput label="আবেদন কর্তী (English)" placeholder="আবেদন কর্তী" value={applicantEn} onChangeText={setApplicantEn} />
      </FieldRow>

      <FieldRow>
        <LabeledInput label="মোবাইল" placeholder="মোবাইল" value={mobile} onChangeText={setMobile} keyboardType="phone-pad" />
        <View style={[styles.fieldContainer, { flex: 1 }]}>
          <Text style={styles.fieldLabel}>
            {captchaNum1} + {captchaNum2}
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="মোট"
            placeholderTextColor="#999"
            value={captchaAnswer}
            onChangeText={setCaptchaAnswer}
            keyboardType="numeric"
          />
        </View>
      </FieldRow>

      {/* ════════ Heirs Table ════════ */}
      <View style={styles.tableContainer}>
        {/* Table Header */}
        <View style={styles.tableHeaderRow}>
          <Text style={[styles.tableHeaderCell, { flex: 0.5 }]}>ক্রমিক</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>ওয়ারিশপত্রদের নাম</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>ওয়ারিশপত্রদের নাম(English)</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1 }]}>এন আই ডি</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1 }]}>সম্পর্ক</Text>
          <Text style={[styles.tableHeaderCell, { flex: 0.5 }]}>বয়স</Text>
          <Text style={[styles.tableHeaderCell, { flex: 0.5 }]}>সিরিয়াল</Text>
          <TouchableOpacity style={styles.addBtnHeader} onPress={addHeir}>
            <Text style={styles.addBtnText}>＋</Text>
          </TouchableOpacity>
        </View>

        {/* Table Rows */}
        {heirs.map((heir, index) => (
          <View key={index} style={styles.tableDataRow}>
            <Text style={[styles.tableCell, { flex: 0.5 }]}>{index + 1}</Text>
            <TextInput
              style={[styles.tableCellInput, { flex: 1.5 }]}
              placeholder="নাম"
              placeholderTextColor="#999"
              value={heir.nameBn}
              onChangeText={(v) => updateHeir(index, 'nameBn', v)}
            />
            <TextInput
              style={[styles.tableCellInput, { flex: 1.5 }]}
              placeholder="Name"
              placeholderTextColor="#999"
              value={heir.nameEn}
              onChangeText={(v) => updateHeir(index, 'nameEn', v)}
            />
            <TextInput
              style={[styles.tableCellInput, { flex: 1 }]}
              placeholder="NID"
              placeholderTextColor="#999"
              value={heir.nid}
              onChangeText={(v) => updateHeir(index, 'nid', v)}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.tableCellInput, { flex: 1 }]}
              placeholder="সম্পর্ক"
              placeholderTextColor="#999"
              value={heir.relationship}
              onChangeText={(v) => updateHeir(index, 'relationship', v)}
            />
            <TextInput
              style={[styles.tableCellInput, { flex: 0.5 }]}
              placeholder="বয়স"
              placeholderTextColor="#999"
              value={heir.age}
              onChangeText={(v) => updateHeir(index, 'age', v)}
              keyboardType="numeric"
            />
            <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.serialText}>{index + 1}</Text>
            </View>
            {heirs.length > 1 && (
              <TouchableOpacity style={styles.removeBtnRow} onPress={() => removeHeir(index)}>
                <Text style={styles.removeBtnText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      {/* ════════ Buttons ════════ */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backBtn} onPress={handleGoBack}>
          <Text style={styles.backBtnText}>◀ আগের জায়গাই</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>সাবমিট 🔒</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    padding: 14,
  },

  // Breadcrumb
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  breadcrumbAccent: {
    width: 5,
    minHeight: 32,
    backgroundColor: '#2e7d32',
  },
  breadcrumbText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
    paddingVertical: 7,
    paddingHorizontal: 10,
  },

  // Field Layout
  fieldRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  fieldContainer: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
    marginBottom: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    color: '#222',
    backgroundColor: '#fafafa',
  },

  // Dropdown
  dropdownBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 9,
    backgroundColor: '#fafafa',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownBtnText: {
    fontSize: 14,
    color: '#555',
  },
  dropdownArrow: {
    fontSize: 10,
    color: '#666',
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginTop: 2,
    backgroundColor: '#fff',
    zIndex: 100,
    elevation: 5,
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },

  // Table
  tableContainer: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#2e7d32',
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  tableHeaderCell: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    paddingHorizontal: 2,
  },
  addBtnHeader: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  addBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2e7d32',
  },
  tableDataRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  tableCell: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 2,
  },
  tableCellInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
    fontSize: 12,
    color: '#222',
    marginHorizontal: 2,
    backgroundColor: '#fff',
  },
  serialText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
  },
  removeBtnRow: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#d32f2f',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  removeBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },

  // Buttons
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    justifyContent: 'center',
  },
  backBtn: {
    backgroundColor: '#1976d2',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
  },
  backBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  submitBtn: {
    backgroundColor: '#2e7d32',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
