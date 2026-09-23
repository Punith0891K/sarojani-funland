#!/usr/bin/env python3
"""
Backend API Test Suite for Sarojani Funland
Tests all API endpoints with validation scenarios
"""

import requests
import json
import sys
from datetime import datetime

# Use internal localhost URL for testing
BASE_URL = "http://localhost:3000/api"

def print_test_result(test_name, passed, details=""):
    """Print formatted test result"""
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"\n{status}: {test_name}")
    if details:
        print(f"   Details: {details}")

def test_api_root():
    """Test 1: GET /api/ should return 200 with ok: true"""
    print("\n" + "="*60)
    print("TEST 1: API Root Ping (GET /api/)")
    print("="*60)
    
    try:
        response = requests.get(f"{BASE_URL}/", timeout=10)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 200:
            print_test_result("API Root Ping", False, f"Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        if not data.get('ok'):
            print_test_result("API Root Ping", False, "Response missing 'ok: true'")
            return False
        
        if 'message' not in data:
            print_test_result("API Root Ping", False, "Response missing 'message' field")
            return False
        
        print_test_result("API Root Ping", True, f"Message: {data.get('message')}")
        return True
        
    except Exception as e:
        print_test_result("API Root Ping", False, f"Exception: {str(e)}")
        return False

def test_create_booking_valid():
    """Test 2: POST /api/bookings with valid payload"""
    print("\n" + "="*60)
    print("TEST 2: Create Booking - Valid Payload")
    print("="*60)
    
    payload = {
        "parentName": "Priya Sharma",
        "mobile": "6360921458",
        "activity": "Full Play Zone Package",
        "unitPrice": 250,
        "totalAmount": 500,
        "childrenCount": 2,
        "childrenNames": ["Anaya", "Vikram"],
        "date": "2025-08-15",
        "timeSlot": "5:00 PM",
        "notes": "birthday"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/bookings", json=payload, timeout=10)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 201:
            print_test_result("Create Booking (Valid)", False, f"Expected 201, got {response.status_code}")
            return False, None
        
        data = response.json()
        
        # Check response structure
        if not data.get('ok'):
            print_test_result("Create Booking (Valid)", False, "Response missing 'ok: true'")
            return False, None
        
        if 'booking' not in data:
            print_test_result("Create Booking (Valid)", False, "Response missing 'booking' object")
            return False, None
        
        booking = data['booking']
        
        # Verify UUID id exists
        if 'id' not in booking:
            print_test_result("Create Booking (Valid)", False, "Booking missing 'id' field")
            return False, None
        
        # Verify _id (Mongo ObjectId) is NOT present
        if '_id' in booking:
            print_test_result("Create Booking (Valid)", False, "Booking contains MongoDB '_id' field (should be excluded)")
            return False, None
        
        # Verify all fields are present
        required_fields = ['parentName', 'mobile', 'activity', 'date', 'timeSlot', 'status', 'createdAt']
        for field in required_fields:
            if field not in booking:
                print_test_result("Create Booking (Valid)", False, f"Booking missing '{field}' field")
                return False, None
        
        # Verify status is confirmed
        if booking.get('status') != 'confirmed':
            print_test_result("Create Booking (Valid)", False, f"Expected status 'confirmed', got '{booking.get('status')}'")
            return False, None
        
        # Verify createdAt is ISO format
        try:
            datetime.fromisoformat(booking['createdAt'].replace('Z', '+00:00'))
        except:
            print_test_result("Create Booking (Valid)", False, f"createdAt is not valid ISO format: {booking.get('createdAt')}")
            return False, None
        
        print_test_result("Create Booking (Valid)", True, f"Booking created with ID: {booking['id']}")
        return True, booking['id']
        
    except Exception as e:
        print_test_result("Create Booking (Valid)", False, f"Exception: {str(e)}")
        return False, None

def test_create_booking_missing_field():
    """Test 3: POST /api/bookings with missing required field"""
    print("\n" + "="*60)
    print("TEST 3: Create Booking - Missing Required Field (timeSlot)")
    print("="*60)
    
    payload = {
        "parentName": "Priya Sharma",
        "mobile": "6360921458",
        "activity": "Full Play Zone Package",
        "date": "2025-08-15",
        # Missing timeSlot
        "childrenCount": 2
    }
    
    try:
        response = requests.post(f"{BASE_URL}/bookings", json=payload, timeout=10)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 400:
            print_test_result("Create Booking (Missing Field)", False, f"Expected 400, got {response.status_code}")
            return False
        
        data = response.json()
        
        # Check error message mentions the missing field
        error_msg = data.get('error', '').lower()
        if 'timeslot' not in error_msg and 'missing' not in error_msg:
            print_test_result("Create Booking (Missing Field)", False, f"Error message should mention missing field: {data.get('error')}")
            return False
        
        print_test_result("Create Booking (Missing Field)", True, f"Correctly rejected with: {data.get('error')}")
        return True
        
    except Exception as e:
        print_test_result("Create Booking (Missing Field)", False, f"Exception: {str(e)}")
        return False

def test_create_booking_invalid_mobile():
    """Test 4: POST /api/bookings with invalid mobile"""
    print("\n" + "="*60)
    print("TEST 4: Create Booking - Invalid Mobile Numbers")
    print("="*60)
    
    test_cases = [
        ("12345", "Too short (5 digits)"),
        ("abcdefghij", "Non-numeric"),
        ("123456789", "9 digits"),
        ("12345678901", "11 digits")
    ]
    
    all_passed = True
    
    for mobile, description in test_cases:
        print(f"\n  Testing: {description} - '{mobile}'")
        
        payload = {
            "parentName": "Priya Sharma",
            "mobile": mobile,
            "activity": "Full Play Zone Package",
            "date": "2025-08-15",
            "timeSlot": "5:00 PM"
        }
        
        try:
            response = requests.post(f"{BASE_URL}/bookings", json=payload, timeout=10)
            
            print(f"  Status Code: {response.status_code}")
            print(f"  Response: {response.text}")
            
            if response.status_code != 400:
                print(f"  ❌ Expected 400, got {response.status_code}")
                all_passed = False
                continue
            
            data = response.json()
            error_msg = data.get('error', '').lower()
            
            if 'mobile' not in error_msg and 'invalid' not in error_msg:
                print(f"  ❌ Error message should mention invalid mobile: {data.get('error')}")
                all_passed = False
                continue
            
            print(f"  ✅ Correctly rejected with: {data.get('error')}")
            
        except Exception as e:
            print(f"  ❌ Exception: {str(e)}")
            all_passed = False
    
    print_test_result("Create Booking (Invalid Mobile)", all_passed, "All invalid mobile formats rejected")
    return all_passed

def test_list_bookings(expected_booking_id=None):
    """Test 5: GET /api/bookings"""
    print("\n" + "="*60)
    print("TEST 5: List Bookings (GET /api/bookings)")
    print("="*60)
    
    try:
        response = requests.get(f"{BASE_URL}/bookings", timeout=10)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text[:500]}...")  # Truncate long responses
        
        if response.status_code != 200:
            print_test_result("List Bookings", False, f"Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        
        # Check response structure
        if 'items' not in data:
            print_test_result("List Bookings", False, "Response missing 'items' array")
            return False
        
        if not isinstance(data['items'], list):
            print_test_result("List Bookings", False, "'items' is not an array")
            return False
        
        items = data['items']
        print(f"Found {len(items)} bookings")
        
        # Check if any booking has _id field
        for idx, booking in enumerate(items):
            if '_id' in booking:
                print_test_result("List Bookings", False, f"Booking at index {idx} contains MongoDB '_id' field (should be excluded)")
                return False
        
        # If we created a booking earlier, verify it's in the list
        if expected_booking_id and items:
            found = any(b.get('id') == expected_booking_id for b in items)
            if not found:
                print_test_result("List Bookings", False, f"Previously created booking {expected_booking_id} not found in list")
                return False
            print(f"✓ Found previously created booking: {expected_booking_id}")
        
        # Verify sorting (descending by createdAt)
        if len(items) > 1:
            dates = [b.get('createdAt') for b in items if b.get('createdAt')]
            if dates == sorted(dates, reverse=True):
                print("✓ Bookings correctly sorted by createdAt (descending)")
            else:
                print("⚠ Warning: Bookings may not be sorted correctly")
        
        print_test_result("List Bookings", True, f"Retrieved {len(items)} bookings successfully")
        return True
        
    except Exception as e:
        print_test_result("List Bookings", False, f"Exception: {str(e)}")
        return False

def test_create_enquiry_valid():
    """Test 6: POST /api/enquiries with valid payload"""
    print("\n" + "="*60)
    print("TEST 6: Create Enquiry - Valid Payload")
    print("="*60)
    
    payload = {
        "name": "Priya Sharma",
        "mobile": "6360921458",
        "type": "birthday",
        "groupSize": 15,
        "preferredDate": "2025-08-15",
        "message": "7yr birthday party"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/enquiries", json=payload, timeout=10)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 201:
            print_test_result("Create Enquiry (Valid)", False, f"Expected 201, got {response.status_code}")
            return False
        
        data = response.json()
        
        # Check response structure
        if not data.get('ok'):
            print_test_result("Create Enquiry (Valid)", False, "Response missing 'ok: true'")
            return False
        
        if 'enquiry' not in data:
            print_test_result("Create Enquiry (Valid)", False, "Response missing 'enquiry' object")
            return False
        
        enquiry = data['enquiry']
        
        # Verify UUID id exists
        if 'id' not in enquiry:
            print_test_result("Create Enquiry (Valid)", False, "Enquiry missing 'id' field")
            return False
        
        # Verify _id is NOT present
        if '_id' in enquiry:
            print_test_result("Create Enquiry (Valid)", False, "Enquiry contains MongoDB '_id' field (should be excluded)")
            return False
        
        # Verify required fields
        required_fields = ['name', 'mobile', 'type', 'createdAt']
        for field in required_fields:
            if field not in enquiry:
                print_test_result("Create Enquiry (Valid)", False, f"Enquiry missing '{field}' field")
                return False
        
        # Verify createdAt is ISO format
        try:
            datetime.fromisoformat(enquiry['createdAt'].replace('Z', '+00:00'))
        except:
            print_test_result("Create Enquiry (Valid)", False, f"createdAt is not valid ISO format: {enquiry.get('createdAt')}")
            return False
        
        print_test_result("Create Enquiry (Valid)", True, f"Enquiry created with ID: {enquiry['id']}")
        return True
        
    except Exception as e:
        print_test_result("Create Enquiry (Valid)", False, f"Exception: {str(e)}")
        return False

def test_create_enquiry_invalid():
    """Test 7: POST /api/enquiries with missing name or invalid mobile"""
    print("\n" + "="*60)
    print("TEST 7: Create Enquiry - Invalid Input")
    print("="*60)
    
    test_cases = [
        ({"mobile": "6360921458", "type": "birthday"}, "Missing name"),
        ({"name": "Priya Sharma", "mobile": "12345"}, "Invalid mobile (too short)"),
        ({"name": "Priya Sharma", "mobile": "abcdefghij"}, "Invalid mobile (non-numeric)"),
        ({"name": "", "mobile": "6360921458"}, "Empty name"),
    ]
    
    all_passed = True
    
    for payload, description in test_cases:
        print(f"\n  Testing: {description}")
        print(f"  Payload: {json.dumps(payload)}")
        
        try:
            response = requests.post(f"{BASE_URL}/enquiries", json=payload, timeout=10)
            
            print(f"  Status Code: {response.status_code}")
            print(f"  Response: {response.text}")
            
            if response.status_code != 400:
                print(f"  ❌ Expected 400, got {response.status_code}")
                all_passed = False
                continue
            
            data = response.json()
            if 'error' not in data:
                print(f"  ❌ Response missing 'error' field")
                all_passed = False
                continue
            
            print(f"  ✅ Correctly rejected with: {data.get('error')}")
            
        except Exception as e:
            print(f"  ❌ Exception: {str(e)}")
            all_passed = False
    
    print_test_result("Create Enquiry (Invalid)", all_passed, "All invalid inputs rejected")
    return all_passed

def test_cors():
    """Test 8: CORS headers on OPTIONS request"""
    print("\n" + "="*60)
    print("TEST 8: CORS Headers (OPTIONS /api/bookings)")
    print("="*60)
    
    try:
        response = requests.options(f"{BASE_URL}/bookings", timeout=10)
        
        print(f"Status Code: {response.status_code}")
        print(f"Headers: {dict(response.headers)}")
        
        if response.status_code != 204:
            print_test_result("CORS Headers", False, f"Expected 204, got {response.status_code}")
            return False
        
        # Check required CORS headers
        required_headers = [
            'Access-Control-Allow-Origin',
            'Access-Control-Allow-Methods',
            'Access-Control-Allow-Headers'
        ]
        
        missing_headers = []
        for header in required_headers:
            if header not in response.headers:
                missing_headers.append(header)
        
        if missing_headers:
            print_test_result("CORS Headers", False, f"Missing headers: {', '.join(missing_headers)}")
            return False
        
        print(f"✓ Access-Control-Allow-Origin: {response.headers.get('Access-Control-Allow-Origin')}")
        print(f"✓ Access-Control-Allow-Methods: {response.headers.get('Access-Control-Allow-Methods')}")
        print(f"✓ Access-Control-Allow-Headers: {response.headers.get('Access-Control-Allow-Headers')}")
        
        print_test_result("CORS Headers", True, "All CORS headers present")
        return True
        
    except Exception as e:
        print_test_result("CORS Headers", False, f"Exception: {str(e)}")
        return False

def main():
    """Run all backend tests"""
    print("\n" + "="*80)
    print("SAROJANI FUNLAND BACKEND API TEST SUITE")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print(f"Test Time: {datetime.now().isoformat()}")
    print("="*80)
    
    results = {}
    
    # Test 1: API Root
    results['api_root'] = test_api_root()
    
    # Test 2: Create booking (valid) - save booking ID for later
    booking_passed, booking_id = test_create_booking_valid()
    results['create_booking_valid'] = booking_passed
    
    # Test 3: Create booking (missing field)
    results['create_booking_missing'] = test_create_booking_missing_field()
    
    # Test 4: Create booking (invalid mobile)
    results['create_booking_invalid_mobile'] = test_create_booking_invalid_mobile()
    
    # Test 5: List bookings
    results['list_bookings'] = test_list_bookings(booking_id)
    
    # Test 6: Create enquiry (valid)
    results['create_enquiry_valid'] = test_create_enquiry_valid()
    
    # Test 7: Create enquiry (invalid)
    results['create_enquiry_invalid'] = test_create_enquiry_invalid()
    
    # Test 8: CORS
    results['cors'] = test_cors()
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {test_name}")
    
    print("="*80)
    print(f"TOTAL: {passed}/{total} tests passed ({passed*100//total}%)")
    print("="*80)
    
    # Exit with appropriate code
    sys.exit(0 if passed == total else 1)

if __name__ == "__main__":
    main()
