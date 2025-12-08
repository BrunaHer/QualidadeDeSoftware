import { Platform, StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  scroll: { flexGrow: 1 },

  container: {
    flex: 1,
    paddingTop: Platform.select({ ios: 60, android: 60, default: 60 }),
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },

  logoWrapper: {
    alignItems: 'center',
    marginBottom: 32,
  },

  logo: {
    width: 160,
    height: 160,
  },

  form: {
    gap: 12,
  },

  label: {
    fontSize: 14,
    marginBottom: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    marginBottom: 4,
  },

  fixedField: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginBottom: 8,
  },

  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    justifyContent: 'space-between',
    marginBottom: 4,
    backgroundColor: '#fff',
  },

  dropdownText: {
    fontSize: 16,
  },

  loginButton: {
    backgroundColor: '#1976d2',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },

  registerButton: {
    backgroundColor: '#1976d2',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
  },

  footer: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
    gap: 4,
  },

  smallText: {
    fontSize: 14,
    color: '#444',
  },

  linkText: {
    color: '#156abd',
    fontWeight: '600',
  },

  errorText: {
    color: '#b00020',
    fontSize: 12,
    marginBottom: 4,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    padding: 24,
  },

  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 10,
  },

  modalTitle: {
    fontSize: 18,
    marginBottom: 12,
  },

  courseItem: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },

  courseText: {
    fontSize: 16,
  },

  separator: {
    height: 1,
    backgroundColor: '#eee',
  },

  closeButton: {
    marginTop: 12,
    alignSelf: 'flex-end',
    padding: 8,
  },

  closeText: {
    color: '#14406eff',
    fontWeight: '600',
  },
});
