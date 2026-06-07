import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

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
  keyboardType?: 'default' | 'numeric' | 'phone-pad' | 'email-address';
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

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );
}

const WARD_OPTIONS = ['১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
const FY_OPTIONS = ['২০২৩-২০২৪', '২০২৪-২০২৫', '২০২৫-২০২৬'];

// ─── Main Component ────────────────────────────────────────────────
export default function TradeLicenseApplicationScreen() {
  const router = useRouter();

  // Form fields
  const [businessNameBn, setBusinessNameBn] = useState('');
  const [businessNameEn, setBusinessNameEn] = useState('');
  const [date, setDate] = useState('2026-06-07');
  const [financialYear, setFinancialYear] = useState('');
  const [proprietorNameBn, setProprietorNameBn] = useState('');
  const [proprietorNameEn, setProprietorNameEn] = useState('');
  const [nid, setNid] = useState('');
  const [mobile, setMobile] = useState('');
  const [fatherNameBn, setFatherNameBn] = useState('');
  const [fatherNameEn, setFatherNameEn] = useState('');
  const [motherNameBn, setMotherNameBn] = useState('');
  const [motherNameEn, setMotherNameEn] = useState('');
  const [businessDetailsBn, setBusinessDetailsBn] = useState('');
  const [businessDetailsEn, setBusinessDetailsEn] = useState('');
  const [businessAddressBn, setBusinessAddressBn] = useState('');
  const [businessAddressEn, setBusinessAddressEn] = useState('');
  const [estimatedCapital, setEstimatedCapital] = useState('');
  const [tradeLicenseFee, setTradeLicenseFee] = useState('');
  const [professionTax, setProfessionTax] = useState('');
  const [vat, setVat] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [email, setEmail] = useState('');

  // Address Section
  const [villageBn, setVillageBn] = useState('');
  const [villageEn, setVillageEn] = useState('');
  const [postOfficeBn, setPostOfficeBn] = useState('');
  const [postOfficeEn, setPostOfficeEn] = useState('');
  const [wardNo, setWardNo] = useState('');
  
  // Dropdowns state
  const [showWardPicker, setShowWardPicker] = useState(false);
  const [showFyPicker, setShowFyPicker] = useState(false);

  // Captcha
  const [captchaNum1] = useState(Math.floor(Math.random() * 9) + 1);
  const [captchaNum2] = useState(Math.floor(Math.random() * 9) + 1);
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  // Images
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [nidImageUri, setNidImageUri] = useState<string | null>(null);

  const pickImage = async (setter: (uri: string | null) => void) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled && result.assets[0]) {
      setter(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    // Validate captcha
    if (parseInt(captchaAnswer, 10) !== captchaNum1 + captchaNum2) {
      Alert.alert('ত্রুটি', 'ক্যাপচা সঠিক নয়। অনুগ্রহ করে আবার চেষ্টা করুন।');
      return;
    }

    const formData: Record<string, string> = {
      'ব্যবসা প্রতিষ্ঠানের নাম': businessNameBn,
      'ব্যবসা প্রতিষ্ঠানের নাম (English)': businessNameEn,
      'তারিখ': date,
      'অর্থবছর': financialYear,
      'প্রোপ্রাইটরের নাম': proprietorNameBn,
      'প্রোপ্রাইটরের নাম (English)': proprietorNameEn,
      'এন আই ডি': nid,
      'মোবাইল': mobile,
      'পিতা/স্বামী': fatherNameBn,
      'পিতা/স্বামী (English)': fatherNameEn,
      'মাতা': motherNameBn,
      'মাতা(English)': motherNameEn,
      'প্রতিষ্ঠানের বিবরণ': businessDetailsBn,
      'প্রতিষ্ঠানের বিবরণ (English)': businessDetailsEn,
      'প্রতিষ্ঠানের ঠিকানা': businessAddressBn,
      'প্রতিষ্ঠানের ঠিকানা (English)': businessAddressEn,
      'আনুমানিক মূলধন': estimatedCapital,
      'ট্রেড লাইসেন্স ফি /(বার্ষিক)': tradeLicenseFee,
      'ব্যবসা বৃত্তি / পেশার উপর কর': professionTax,
      'ভ্যাট': vat,
      'মোট': totalAmount,
      'ইমেইল': email,
      'গ্রাম/ রাস্তা/ এলাকা': villageBn,
      'গ্রাম/ রাস্তা/ এলাকা(English)': villageEn,
      'পোস্ট অফিস': postOfficeBn,
      'পোস্ট অফিস (English)': postOfficeEn,
      'ওয়ার্ড নং': wardNo,
    };

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
        <Text style={styles.breadcrumbText}>ই-সেবা » ট্রেড লাইসেন্স</Text>
      </View>

      {/* ════════ Main Form Fields ════════ */}
      <FieldRow>
        <LabeledInput label="ব্যবসা প্রতিষ্ঠানের নাম" placeholder="ব্যবসা প্রতিষ্ঠানের নাম" value={businessNameBn} onChangeText={setBusinessNameBn} />
        <LabeledInput label="ব্যবসা প্রতিষ্ঠানের নাম (English)" placeholder="ব্যবসা প্রতিষ্ঠানের নাম" value={businessNameEn} onChangeText={setBusinessNameEn} />
      </FieldRow>

      <FieldRow>
        <LabeledInput label="তারিখ" placeholder="তারিখ" value={date} onChangeText={setDate} />
        <View style={[styles.fieldContainer, { flex: 1 }]}>
          <Text style={styles.fieldLabel}>অর্থবছর</Text>
          <TouchableOpacity style={styles.dropdownBtn} onPress={() => setShowFyPicker(!showFyPicker)}>
            <Text style={styles.dropdownBtnText}>{financialYear || 'অর্থবছর'}</Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
          {showFyPicker && (
            <View style={styles.dropdownList}>
              {FY_OPTIONS.map((y) => (
                <TouchableOpacity
                  key={y}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setFinancialYear(y);
                    setShowFyPicker(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{y}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </FieldRow>

      <FieldRow>
        <LabeledInput label="প্রোপ্রাইটরের নাম" placeholder="প্রোপ্রাইটরের নাম" value={proprietorNameBn} onChangeText={setProprietorNameBn} />
        <LabeledInput label="প্রোপ্রাইটরের নাম (English)" placeholder="প্রোপ্রাইটরের নাম" value={proprietorNameEn} onChangeText={setProprietorNameEn} />
      </FieldRow>

      <FieldRow>
        <LabeledInput label="এন আই ডি" placeholder="এন আই ডি" value={nid} onChangeText={setNid} keyboardType="numeric" />
        <LabeledInput label="মোবাইল" placeholder="মোবাইল" value={mobile} onChangeText={setMobile} keyboardType="phone-pad" />
      </FieldRow>

      <FieldRow>
        <LabeledInput label="পিতা/স্বামী" placeholder="পিতা/স্বামী" value={fatherNameBn} onChangeText={setFatherNameBn} />
        <LabeledInput label="পিতা/স্বামী (English)" placeholder="পিতা/স্বামী" value={fatherNameEn} onChangeText={setFatherNameEn} />
      </FieldRow>

      <FieldRow>
        <LabeledInput label="মাতা" placeholder="মাতা" value={motherNameBn} onChangeText={setMotherNameBn} />
        <LabeledInput label="মাতা(English)" placeholder="মাতা" value={motherNameEn} onChangeText={setMotherNameEn} />
      </FieldRow>

      <FieldRow>
        <LabeledInput label="প্রতিষ্ঠানের বিবরণ" placeholder="প্রতিষ্ঠানের বিবরণ" value={businessDetailsBn} onChangeText={setBusinessDetailsBn} />
        <LabeledInput label="প্রতিষ্ঠানের বিবরণ (English)" placeholder="প্রতিষ্ঠানের বিবরণ" value={businessDetailsEn} onChangeText={setBusinessDetailsEn} />
      </FieldRow>

      <FieldRow>
        <LabeledInput label="প্রতিষ্ঠানের ঠিকানা" placeholder="প্রতিষ্ঠানের ঠিকানা" value={businessAddressBn} onChangeText={setBusinessAddressBn} />
        <LabeledInput label="প্রতিষ্ঠানের ঠিকানা (English)" placeholder="প্রতিষ্ঠানের ঠিকানা" value={businessAddressEn} onChangeText={setBusinessAddressEn} />
      </FieldRow>

      <FieldRow>
        <LabeledInput label="আনুমানিক মূলধন" placeholder="আনুমানিক মূলধন" value={estimatedCapital} onChangeText={setEstimatedCapital} keyboardType="numeric" />
        <LabeledInput label="ট্রেড লাইসেন্স ফি /(বার্ষিক)" placeholder="ট্রেড লাইসেন্স ফি" value={tradeLicenseFee} onChangeText={setTradeLicenseFee} keyboardType="numeric" />
      </FieldRow>

      <View style={styles.fieldRow}>
        <LabeledInput label="ব্যবসা বৃত্তি / পেশার উপর কর" placeholder="ব্যবসা বৃত্তি / পেশার" value={professionTax} onChangeText={setProfessionTax} keyboardType="numeric" />
        <LabeledInput label="ভ্যাট" placeholder="ভ্যাট" value={vat} onChangeText={setVat} keyboardType="numeric" />
        <LabeledInput label="মোট" placeholder="মোট" value={totalAmount} onChangeText={setTotalAmount} keyboardType="numeric" />
      </View>

      <FieldRow>
        <LabeledInput label="ইমেইল" placeholder="ইমেইল" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <View style={{ flex: 1 }} />
      </FieldRow>

      {/* ════════ Address Details ════════ */}
      <SectionHeader title="ঠিকানা" />

      <FieldRow>
        <LabeledInput label="গ্রাম/ রাস্তা/ এলাকা" placeholder="গ্রাম/ রাস্তা" value={villageBn} onChangeText={setVillageBn} />
        <LabeledInput label="গ্রাম/ রাস্তা/ এলাকা(English)" placeholder="গ্রাম/ রাস্তা" value={villageEn} onChangeText={setVillageEn} />
      </FieldRow>

      <FieldRow>
        <LabeledInput label="পোস্ট অফিস" placeholder="পোস্ট অফিস" value={postOfficeBn} onChangeText={setPostOfficeBn} />
        <LabeledInput label="পোস্ট অফিস (English)" placeholder="পোস্ট অফিস" value={postOfficeEn} onChangeText={setPostOfficeEn} />
      </FieldRow>

      <FieldRow>
        <View style={[styles.fieldContainer, { flex: 1 }]}>
          <Text style={styles.fieldLabel}>ওয়ার্ড নং</Text>
          <TouchableOpacity style={styles.dropdownBtn} onPress={() => setShowWardPicker(!showWardPicker)}>
            <Text style={styles.dropdownBtnText}>{wardNo || 'ওয়ার্ড নং'}</Text>
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
        <View style={[styles.fieldContainer, { flex: 1 }]}>
          <Text style={styles.fieldLabel}>{captchaNum1} + {captchaNum2}</Text>
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

      <FieldRow>
        {/* Photo Upload */}
        <View style={[styles.fieldContainer, { flex: 1 }]}>
          <Text style={styles.fieldLabel}>ফটো</Text>
          <View style={styles.fileUploadRow}>
             <TextInput 
                style={[styles.textInput, {flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0}]} 
                editable={false} 
                placeholder="No file chosen" 
                value={photoUri ? 'File selected' : ''}
              />
             <TouchableOpacity style={styles.chooseFileBtn} onPress={() => pickImage(setPhotoUri)}>
               <Text style={styles.chooseFileText}>Choose file</Text>
             </TouchableOpacity>
          </View>
        </View>

        {/* NID Image Upload */}
        <View style={[styles.fieldContainer, { flex: 1, alignItems: 'center' }]}>
           <Text style={styles.fieldLabel}>আইডি নং</Text>
           <View style={styles.imagePreview}>
            {nidImageUri ? (
              <Image source={{ uri: nidImageUri }} style={styles.previewImage} />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>🪪</Text>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.selectImageBtn} onPress={() => pickImage(setNidImageUri)}>
            <Text style={styles.selectImageText}>Select image</Text>
          </TouchableOpacity>
        </View>
      </FieldRow>

      {/* ════════ Buttons ════════ */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backBtn} onPress={handleGoBack}>
          <Text style={styles.actionBtnText}>« আগের জায়গাই</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.actionBtnText}>সাবমিট ☁</Text>
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
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#689f38',
  },
  breadcrumbAccent: {
    width: 5,
    minHeight: 32,
    backgroundColor: '#558b2f',
  },
  breadcrumbText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  sectionHeader: {
    marginTop: 20,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  fieldRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 12,
  },
  fieldContainer: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#333',
    marginBottom: 6,
    textAlign: 'right', // matching screenshot layout
    paddingRight: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#b0c4de', // Light steel blue border from screenshot
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 13,
    color: '#333',
    backgroundColor: '#fff',
  },
  dropdownBtn: {
    borderWidth: 1,
    borderColor: '#b0c4de',
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownBtnText: {
    fontSize: 13,
    color: '#333',
  },
  dropdownArrow: {
    fontSize: 10,
    color: '#333',
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: '#b0c4de',
    marginTop: 2,
    backgroundColor: '#fff',
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 100,
  },
  dropdownItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    fontSize: 13,
    color: '#333',
  },
  fileUploadRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chooseFileBtn: {
    backgroundColor: '#337ab7', // Bootstrap primary color
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  chooseFileText: {
    color: '#fff',
    fontSize: 13,
  },
  imagePreview: {
    width: 140,
    height: 80,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 24,
  },
  selectImageBtn: {
    backgroundColor: '#e6e6fa', // Light lavender
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectImageText: {
    fontSize: 12,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
    paddingLeft: 10,
  },
  backBtn: {
    backgroundColor: '#26c6da', // Cyan color
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 2,
  },
  submitBtn: {
    backgroundColor: '#26c6da', // Cyan color
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 2,
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
